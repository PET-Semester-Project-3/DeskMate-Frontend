// @ts-check
import { test, expect } from '@playwright/test';

// Mock user data
const mockUser = {
  id: 1,
  email: 'test@example.com',
};

const mockPermissions = [
  { permission: { id: 1, name: 'dashboard' } },
  { permission: { id: 2, name: 'profile' } },
];

/**
 * Setup API mocks for authentication tests
 * Uses glob patterns to intercept all backend requests
 */
async function setupAuthMocks(page, { apiReady = true, loginSuccess = true } = {}) {
  // Mock ALL requests to backend - this catches everything to localhost:3000
  await page.route('**/localhost:3000/**', async (route) => {
    const url = route.request().url();

    // API ready check (root endpoint)
    if (url === 'http://localhost:3000/' || url === 'http://localhost:3000') {
      if (apiReady) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Ready' }),
        });
      } else {
        return route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ success: false, message: 'Service unavailable' }),
        });
      }
    }

    // Login endpoint
    if (url.includes('/api/users/login')) {
      const postData = route.request().postDataJSON();

      if (loginSuccess && postData?.email === 'test@example.com' && postData?.password === 'password123') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: mockUser }),
        });
      } else {
        return route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ success: false, message: 'Invalid email or password' }),
        });
      }
    }

    // User permissions endpoint
    if (url.includes('/api/users/') && url.includes('/permissions')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: mockPermissions }),
      });
    }

    // User desks endpoint
    if (url.includes('/api/users/') && url.includes('/desks')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [] }),
      });
    }

    // Fallback - let other requests through or return 404
    console.log('Unhandled mock request:', url);
    return route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, message: 'Not found' }),
    });
  });

  // Also catch the exact root URL (without path)
  await page.route('http://localhost:3000', async (route) => {
    if (apiReady) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Ready' }),
      });
    } else {
      return route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Service unavailable' }),
      });
    }
  });
}

test.describe('Sign In Page', () => {
  test.describe('UI Elements', () => {
    test('displays all sign-in form elements', async ({ page }) => {
      await setupAuthMocks(page);
      await page.goto('/');

      // Check for logo
      await expect(page.locator('#deskmate-logo-image')).toBeVisible();

      // Check for username field
      const usernameField = page.getByTestId('username-input');
      await expect(usernameField).toBeVisible();

      // Check for password field
      const passwordField = page.getByTestId('password-input');
      await expect(passwordField).toBeVisible();

      // Check for sign-in button
      const signInButton = page.locator('#signin-button');
      await expect(signInButton).toBeVisible();
      await expect(signInButton).toHaveText('Sign in');
    });

    test('password visibility toggle works', async ({ page }) => {
      await setupAuthMocks(page);
      await page.goto('/');

      const passwordField = page.getByTestId('password-input');
      const toggleButton = page.locator('#signin-password-textfield-iconbutton');

      // Initially password should be hidden
      await expect(passwordField).toHaveAttribute('type', 'password');

      // Click toggle to show password
      await toggleButton.click();
      await expect(passwordField).toHaveAttribute('type', 'text');

      // Click toggle to hide password again
      await toggleButton.click();
      await expect(passwordField).toHaveAttribute('type', 'password');
    });
  });

  test.describe('API Status Indicator', () => {
    test('shows green indicator when API is ready', async ({ page }) => {
      await setupAuthMocks(page, { apiReady: true });
      await page.goto('/');

      // Wait for API check
      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();
      await expect(page.locator('#signin-api-status-text')).toHaveText('API is available');
    });

    test('shows red indicator when API is not available', async ({ page }) => {
      // For this test, we abort requests to simulate network failure
      await page.route('**/localhost:3000', (route) => route.abort('connectionrefused'));
      await page.route('**/localhost:3000/**', (route) => route.abort('connectionrefused'));
      await page.route('http://localhost:3000', (route) => route.abort('connectionrefused'));
      await page.goto('/');

      // Wait for the error state
      await expect(page.locator('#signin-api-not-ready-indicator')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('#signin-api-status-text')).toHaveText('API is not available');
    });
  });

  test.describe('Login Flow', () => {
    test('successful login redirects to howtouse page', async ({ page }) => {
      await setupAuthMocks(page, { loginSuccess: true });
      await page.goto('/');

      // Wait for API to be ready
      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();

      // Fill in credentials
      await page.getByTestId('username-input').fill('test@example.com');
      await page.getByTestId('password-input').fill('password123');

      // Click sign in
      await page.locator('#signin-button').click();

      // Should redirect to howtouse page
      await expect(page).toHaveURL(/\/howtouse/);
    });

    test('failed login shows error message', async ({ page }) => {
      await setupAuthMocks(page, { loginSuccess: false });
      await page.goto('/');

      // Wait for API to be ready
      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();

      // Fill in wrong credentials
      await page.getByTestId('username-input').fill('wrong@example.com');
      await page.getByTestId('password-input').fill('wrongpassword');

      // Click sign in
      await page.locator('#signin-button').click();

      // Should show error message (appears on both fields, just check first one)
      await expect(page.getByText('Could not find user or wrong password').first()).toBeVisible();
    });

    test('shows error when API is not available and trying to login', async ({ page }) => {
      // Abort all backend requests to simulate network failure
      await page.route('**/localhost:3000', (route) => route.abort('connectionrefused'));
      await page.route('**/localhost:3000/**', (route) => route.abort('connectionrefused'));
      await page.route('http://localhost:3000', (route) => route.abort('connectionrefused'));
      await page.goto('/');

      // Wait for API not ready state
      await expect(page.locator('#signin-api-not-ready-indicator')).toBeVisible({ timeout: 10000 });

      // Fill in credentials
      await page.getByTestId('username-input').fill('test@example.com');
      await page.getByTestId('password-input').fill('password123');

      // Click sign in
      await page.locator('#signin-button').click();

      // Should show API error
      await expect(page.getByText('No connection to API')).toBeVisible();
    });

    test('can submit form by pressing Enter in username field', async ({ page }) => {
      await setupAuthMocks(page, { loginSuccess: true });
      await page.goto('/');

      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();

      await page.getByTestId('username-input').fill('test@example.com');
      await page.getByTestId('password-input').fill('password123');

      // Press Enter in username field
      await page.getByTestId('username-input').press('Enter');

      await expect(page).toHaveURL(/\/howtouse/);
    });

    test('can submit form by pressing Enter in password field', async ({ page }) => {
      await setupAuthMocks(page, { loginSuccess: true });
      await page.goto('/');

      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();

      await page.getByTestId('username-input').fill('test@example.com');
      await page.getByTestId('password-input').fill('password123');

      // Press Enter in password field
      await page.getByTestId('password-input').press('Enter');

      await expect(page).toHaveURL(/\/howtouse/);
    });
  });

  test.describe('Session Persistence', () => {
    test('user stays logged in after page refresh (via cookie)', async ({ page }) => {
      await setupAuthMocks(page, { loginSuccess: true });
      await page.goto('/');

      // Wait for API and login
      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();
      await page.getByTestId('username-input').fill('test@example.com');
      await page.getByTestId('password-input').fill('password123');
      await page.locator('#signin-button').click();

      // Should be on howtouse page
      await expect(page).toHaveURL(/\/howtouse/);

      // Refresh the page
      await page.reload();

      // Should still be logged in (not on sign-in page)
      await expect(page).not.toHaveURL(/^http:\/\/localhost:5173\/?$/);
    });

    test('user is logged out when session cookie is cleared', async ({ page, context }) => {
      await setupAuthMocks(page, { loginSuccess: true });
      await page.goto('/');

      // Login
      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();
      await page.getByTestId('username-input').fill('test@example.com');
      await page.getByTestId('password-input').fill('password123');
      await page.locator('#signin-button').click();

      await expect(page).toHaveURL(/\/howtouse/);

      // Clear cookies
      await context.clearCookies();

      // Reload page
      await page.reload();

      // Should be back on sign-in page
      await expect(page.locator('#signin-button')).toBeVisible();
    });
  });
});
