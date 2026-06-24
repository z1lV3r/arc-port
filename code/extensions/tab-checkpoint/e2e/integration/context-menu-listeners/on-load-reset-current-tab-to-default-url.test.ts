import { test, expect } from '../../fixtures.ts';
import type { Page } from '@playwright/test';

/*
 * Functional Test: Reset Current Tab to Checkpoint via Context Menu
 */

test.describe('Context Menu - Reset Current Tab to Checkpoint', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    // Create a new page for each test
    page = await context.newPage();
    await page.goto('https://example.com');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should verify context-menu-reset-current-tab-to-checkpoint listener is registered', async ({ context }) => {
    // This test verifies that the specific context menu item is properly registered
    // by accessing the background service worker directly
    
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Verify the specific context menu item exists by polling until it's registered
    // Context menus are registered on chrome.runtime.onInstalled, which may need a moment
    // Poll with retries to handle timing issues
    await expect.poll(async () => {
      return await background.evaluate(async () => {
        return await new Promise<boolean>((resolve) => {
          const menuItemId = 'context-menu-reset-current-tab-to-checkpoint';
          
          // Try to update the menu item - if it exists, this will succeed
          // If it doesn't exist, chrome.runtime.lastError will be set
          chrome.contextMenus.update(menuItemId, {}, () => {
            // Check if there was an error (menu item not found)
            const error = chrome.runtime.lastError;
            // If there's no error, the menu item exists
            resolve(error === undefined);
          });
        });
      });
    }, {
      message: 'Context menu item should be registered',
      timeout: 5000,
    }).toBe(true);
  });
});