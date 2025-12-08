// @ts-check
import { test, expect } from '../fixtures/test-harness';

test.describe('Navigation', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Already logged in via fixture, just verify we're on howtouse page
    await expect(loggedInPage).toHaveURL(/\/howtouse/);
  });

  test.describe('Fixed Navigation Buttons', () => {
    test('clicking logo navigates to How To Use page', async ({ loggedInPage }) => {
      // First go somewhere else
      await loggedInPage.goto('/about');

      // Click logo
      await loggedInPage.locator('#navbar-logo-link').click();

      await expect(loggedInPage).toHaveURL(/\/howtouse/);
    });

    test('clicking How To Use button navigates to How To Use page', async ({ loggedInPage }) => {
      await loggedInPage.goto('/about');

      // Use navbar-specific selector (same ID exists in footer)
      await loggedInPage.locator('#navbar-navigation-buttongroup #footer-information-link-howtouse').click();

      await expect(loggedInPage).toHaveURL(/\/howtouse/);
    });

    test('clicking About button navigates to About page', async ({ loggedInPage }) => {
      // Use navbar-specific selector (same ID exists in footer)
      await loggedInPage.locator('#navbar-navigation-buttongroup #footer-information-link-about').click();

      await expect(loggedInPage).toHaveURL(/\/about/);
    });
  });

  test.describe('Dynamic Navigation Buttons (from permissions)', () => {
    test('clicking Dashboard button navigates to Dashboard', async ({ loggedInPage }) => {
      await loggedInPage.locator('#navbar-navigation-pagebutton-Dashboard').click();

      // Dashboard is at root '/'
      await expect(loggedInPage).toHaveURL(/\/$/);
    });

    test('clicking Desk button navigates to Desk page', async ({ loggedInPage }) => {
      await loggedInPage.locator('#navbar-navigation-pagebutton-Desk').click();

      await expect(loggedInPage).toHaveURL(/\/desk/);
    });

    test('clicking Maintenance button navigates to Maintenance page', async ({ loggedInPage }) => {
      await loggedInPage.locator('#navbar-navigation-pagebutton-Maintenance').click();

      await expect(loggedInPage).toHaveURL(/\/maintenance/);
    });

    test('clicking Database button navigates to Database page', async ({ loggedInPage }) => {
      await loggedInPage.locator('#navbar-navigation-pagebutton-Database').click();

      await expect(loggedInPage).toHaveURL(/\/database/);
    });
  });

  test.describe('Avatar Menu Navigation', () => {
    test('clicking avatar opens menu', async ({ loggedInPage }) => {
      await loggedInPage.locator('#user-avatar').click();

      await expect(loggedInPage.locator('#user-avatar-menu')).toBeVisible();
    });

    test('clicking Profile in avatar menu navigates to Profile page', async ({ loggedInPage }) => {
      await loggedInPage.locator('#user-avatar').click();
      await loggedInPage.locator('#user-avatar-menuitem-profile').click();

      await expect(loggedInPage).toHaveURL(/\/profile/);
    });

    test('clicking My Deskmate in avatar menu navigates to Deskmate page', async ({ loggedInPage }) => {
      await loggedInPage.locator('#user-avatar').click();
      await loggedInPage.locator('#user-avatar-menuitem-deskmate').click();

      await expect(loggedInPage).toHaveURL(/\/deskmate/);
    });

    test('clicking Sign-Out in avatar menu logs out user', async ({ loggedInPage }) => {
      await loggedInPage.locator('#user-avatar').click();
      await loggedInPage.locator('#user-avatar-menuitem-sign-out').click();

      // Should be back on sign-in page
      await expect(loggedInPage.locator('#signin-button')).toBeVisible();
    });
  });
});
