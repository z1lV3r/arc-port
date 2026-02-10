import { test, expect } from '../../../../../fixtures';
import type { Page, BrowserContext } from '@playwright/test';

/*
 * Functional Test: Set Current Tab Default URL via Context Menu
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when the user interacts with the context menu to set the default URL.
 * 
 * Test Scenarios:
 * 1. When the browser context menu is opened (right-click) in any empty space in the page
 *    - a "Default URL" parent menu item should be visible
 *    - the menu should contain "Set current tab URL" option
 * 
 * 2. When the user selects "Set current tab URL" from context menu on "https://example.com"
 *    - the storage should contain "https://example.com" for this tab
 */

test.describe('Context Menu - Set Current Tab Default URL', () => {
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

  test('should verify context-menu-set-current-tab-default-url listener is registered', async ({ context }) => {
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
          const menuItemId = 'context-menu-set-current-tab-default-url';
          
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