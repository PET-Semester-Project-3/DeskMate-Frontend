import { test as base, expect, Page } from '@playwright/test';

// Mock data
export const mockUser = {
  id: 1,
  email: 'test@example.com',
};

export const mockPermissions = [
  { permission: { id: 1, label: 'Dashboard', route: '/' } },
  { permission: { id: 2, label: 'Desk', route: '/desk' } },
  { permission: { id: 3, label: 'Maintenance', route: '/maintenance' } },
  { permission: { id: 4, label: 'Database', route: '/database' } },
];

export const mockDesks = [
  {
    id: 101,
    name: 'My Standing Desk',
    is_online: true,
    last_data: {
      height: 75,
      manufacturer: 'IKEA',
    },
    lasterrors: [],
  },
];

// Type definitions
export interface ApiCall {
  url: string;
  method: string;
  body: Record<string, unknown>;
}

interface TestFixtures {
  apiCalls: ApiCall[];
  mockApi: void;
  login: () => Promise<void>;
  loggedInPage: Page;
}

/**
 * Extended test with API mocking and auth helpers
 */
export const test = base.extend<TestFixtures>({
  apiCalls: async ({ }, use) => {
    const calls: ApiCall[] = [];
    await use(calls);
  },

  mockApi: async ({ page, apiCalls }, use) => {
    await page.route('**/localhost:3000/**', async (route) => {
      const url = route.request().url();
      const method = route.request().method();

      // Track PUT/POST calls
      if (method === 'PUT' || method === 'POST') {
        apiCalls.push({
          url,
          method,
          body: route.request().postDataJSON(),
        });
      }

      // API ready check
      if (url === 'http://localhost:3000/' || url === 'http://localhost:3000') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Ready' }),
        });
      }

      // Login endpoint
      if (url.includes('/api/users/login')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: mockUser }),
        });
      }

      // User permissions endpoint
      if (url.includes('/api/users/') && url.includes('/permissions')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: mockPermissions }),
        });
      }

      // User desks endpoint (GET)
      if (url.includes('/api/users/') && url.includes('/desks') && method === 'GET') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: mockDesks.map(d => ({ desk: d })) }),
        });
      }

      // Desk update endpoint (PUT)
      if (url.includes('/api/desks/') && method === 'PUT') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, data: mockDesks[0] }),
        });
      }

      // Default response for other endpoints
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [] }),
      });
    });

    // Catch exact root URL
    await page.route('http://localhost:3000', async (route) => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Ready' }),
      });
    });

    await use();
  },

  login: async ({ page, mockApi: _ }, use) => {
    const doLogin = async () => {
      await page.goto('/');
      await expect(page.locator('#signin-api-ready-indicator')).toBeVisible();
      await page.getByTestId('username-input').fill('test@example.com');
      await page.getByTestId('password-input').fill('password123');
      await page.locator('#signin-button').click();
      await expect(page).toHaveURL(/\/howtouse/);
    };
    await use(doLogin);
  },

  loggedInPage: async ({ page, mockApi: _, login }, use) => {
    await login();
    await use(page);
  },
});

/**
 * Helper to filter API calls by URL pattern
 */
export function filterApiCalls(apiCalls: ApiCall[], pattern: string): ApiCall[] {
  return apiCalls.filter(call => call.url.includes(pattern));
}

export { expect };
