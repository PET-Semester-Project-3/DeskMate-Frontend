import { test, expect, filterApiCalls } from '../fixtures/test-harness';

test.describe('Desk Page', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Navigate to desk page after auto-login
    await loggedInPage.goto('/desk');
    await expect(loggedInPage).toHaveURL(/\/desk/);
    // Wait for desk to load
    await expect(loggedInPage.locator('#desk-view')).toBeVisible();
  });

  test.describe('Page Load', () => {
    test('displays desk with correct name', async ({ loggedInPage }) => {
      const nameField = loggedInPage.locator('#desk-view-left-panel-desk-name-textfield');
      await expect(nameField).toHaveValue('My Standing Desk');
    });

    test('displays desk with correct height', async ({ loggedInPage }) => {
      await expect(loggedInPage.locator('#desk-view-left-panel-height-header')).toContainText('75 cm');
    });

    test('displays manufacturer info', async ({ loggedInPage }) => {
      await expect(loggedInPage.locator('#desk-view-left-panel-manufacturer-header')).toContainText('IKEA');
    });

    test('displays online status', async ({ loggedInPage }) => {
      const switchLabel = loggedInPage.locator('#desk-view-left-panel-power-container');
      await expect(switchLabel).toContainText('Online');
    });
  });

  test.describe('Name Editing', () => {
    test('clicking edit icon enables name editing', async ({ loggedInPage }) => {
      const nameField = loggedInPage.locator('#desk-view-left-panel-desk-name-textfield');

      // Initially disabled
      await expect(nameField).toBeDisabled();

      // Click edit button
      await loggedInPage.locator('#desk-view-left-panel-desk-name-edit-icon-button').click();

      // Should now be enabled
      await expect(nameField).toBeEnabled();
    });

    test('changing name and confirming calls API', async ({ loggedInPage, apiCalls }) => {
      // Click edit button
      await loggedInPage.locator('#desk-view-left-panel-desk-name-edit-icon-button').click();

      // Clear and type new name
      const nameField = loggedInPage.locator('#desk-view-left-panel-desk-name-textfield');
      await nameField.fill('New Desk Name');

      // Click confirm button
      await loggedInPage.locator('#desk-view-left-panel-desk-name-edit-check-button').click();

      // Wait for API call
      await loggedInPage.waitForTimeout(500);

      // Verify API was called with correct data
      const deskCalls = filterApiCalls(apiCalls, '/api/desks/');
      const nameUpdateCall = deskCalls.find(call => call.body?.name === 'New Desk Name');

      expect(nameUpdateCall).toBeDefined();
      if (nameUpdateCall) {
        expect(nameUpdateCall.method).toBe('PUT');
        expect(nameUpdateCall.body.name).toBe('New Desk Name');
      }
    });

    test('name field shows new value after edit', async ({ loggedInPage }) => {
      await loggedInPage.locator('#desk-view-left-panel-desk-name-edit-icon-button').click();

      const nameField = loggedInPage.locator('#desk-view-left-panel-desk-name-textfield');
      await nameField.fill('Updated Desk');

      await loggedInPage.locator('#desk-view-left-panel-desk-name-edit-check-button').click();

      // Field should now show updated name and be disabled again
      await expect(nameField).toHaveValue('Updated Desk');
      await expect(nameField).toBeDisabled();
    });
  });

  test.describe('Height Adjustment', () => {
    test('adjusting height slider calls API on release', async ({ loggedInPage, apiCalls }) => {
      const slider = loggedInPage.locator('#desk-view-left-panel-height-slider');
      const sliderBounds = await slider.boundingBox();
      expect(sliderBounds).not.toBeNull();

      if (sliderBounds) {
        // Drag slider to change height
        await loggedInPage.mouse.move(sliderBounds.x + sliderBounds.width / 2, sliderBounds.y + sliderBounds.height / 2);
        await loggedInPage.mouse.down();
        await loggedInPage.mouse.move(sliderBounds.x + sliderBounds.width * 0.8, sliderBounds.y + sliderBounds.height / 2);
        await loggedInPage.mouse.up();
      }

      // Wait for API call
      await loggedInPage.waitForTimeout(500);

      // Verify API was called with last_data containing height
      const deskCalls = filterApiCalls(apiCalls, '/api/desks/');
      const heightUpdateCall = deskCalls.find(call => call.body?.last_data?.height !== undefined);

      expect(heightUpdateCall).toBeDefined();
      if (heightUpdateCall) {
        expect(heightUpdateCall.method).toBe('PUT');
        expect(heightUpdateCall.body.last_data).toBeDefined();
      }
    });

    test('height display updates when slider moves', async ({ loggedInPage }) => {
      const slider = loggedInPage.locator('#desk-view-left-panel-height-slider');
      const sliderBounds = await slider.boundingBox();
      expect(sliderBounds).not.toBeNull();

      // Get initial height text
      const initialText = await loggedInPage.locator('#desk-view-left-panel-height-header').textContent();

      if (sliderBounds) {
        // Drag slider significantly
        await loggedInPage.mouse.move(sliderBounds.x + sliderBounds.width * 0.2, sliderBounds.y + sliderBounds.height / 2);
        await loggedInPage.mouse.down();
        await loggedInPage.mouse.move(sliderBounds.x + sliderBounds.width * 0.9, sliderBounds.y + sliderBounds.height / 2);
        await loggedInPage.mouse.up();
      }

      // Height text should change
      const newText = await loggedInPage.locator('#desk-view-left-panel-height-header').textContent();
      expect(newText).not.toBe(initialText);
    });
  });

  test.describe('Online/Offline Toggle', () => {
    test('toggling switch calls API', async ({ loggedInPage, apiCalls }) => {
      const toggle = loggedInPage.locator('#desk-view-left-panel-power-switch');

      // Click to toggle off
      await toggle.click();

      // Wait for API call
      await loggedInPage.waitForTimeout(500);

      // Verify API was called
      const deskCalls = filterApiCalls(apiCalls, '/api/desks/');
      const onlineUpdateCall = deskCalls.find(call => call.body?.is_online !== undefined);

      expect(onlineUpdateCall).toBeDefined();
      if (onlineUpdateCall) {
        expect(onlineUpdateCall.method).toBe('PUT');
        expect(onlineUpdateCall.body.is_online).toBe(false);
      }
    });

    test('label changes when toggled', async ({ loggedInPage }) => {
      const toggle = loggedInPage.locator('#desk-view-left-panel-power-switch');
      const label = loggedInPage.locator('#desk-view-left-panel-power-container');

      // Initially Online
      await expect(label).toContainText('Online');

      // Toggle off
      await toggle.click();

      // Should show Offline
      await expect(label).toContainText('Offline');
    });
  });
});
