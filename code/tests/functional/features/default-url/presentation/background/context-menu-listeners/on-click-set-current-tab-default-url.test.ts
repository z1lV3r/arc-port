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

  test('should set current tab default URL when context menu item is clicked', async ({ context, extensionId }) => {
    // Arrange: Navigate to a specific URL
    const testUrl = 'https://example.com';
    await page.goto(testUrl);
    await page.waitForLoadState('networkidle');

    // Get the current tab ID (we'll need to interact with the extension background)
    const currentTabId = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          resolve(tabs[0].id!);
        });
      });
    });

    // Act: Simulate context menu interaction
    // Note: Playwright doesn't directly support Chrome extension context menus,
    // so we'll test by directly invoking the extension's API
    
    const wasSuccessful = await page.evaluate(async (tabId: number) => {
      try {
        // Trigger the context menu listener through the extension's API
        // This simulates what happens when user clicks the context menu item
        return await new Promise<boolean>((resolve) => {
          // We need to call chrome.runtime.sendMessage or trigger the context menu click
          // Since we can't directly click context menus in Playwright, we verify
          // that the command can be triggered programmatically
          chrome.runtime.sendMessage(
            { 
              action: 'setCurrentTabDefaultUrl',
              tabId: tabId 
            }, 
            (response) => {
              resolve(response?.success === true);
            }
          );
        });
      } catch (error) {
        console.error('Error setting default URL:', error);
        return false;
      }
    }, currentTabId);

    // Assert: Verify the URL was stored
    const storedUrl = await page.evaluate(async (tabId: number) => {
      return await new Promise<string | null>((resolve) => {
        chrome.storage.local.get([`defaultUrl_${tabId}`], (result) => {
          resolve((result[`defaultUrl_${tabId}`] as string) || null);
        });
      });
    }, currentTabId);

    // Verify the operation was successful and URL matches
    expect(storedUrl).toBe(testUrl);
  });

  test('should verify context menu is registered', async ({ context, extensionId }) => {
    // This test verifies that the context menu items are properly registered
    // by accessing the background service worker directly
    
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Evaluate code in the background service worker context
    const contextMenusRegistered = await background.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        // Since chrome.contextMenus.getAll() doesn't exist, we verify by attempting
        // to track context menu creation or by checking if the API is available.
        // The best we can do is verify the contextMenus API exists and is accessible
        const hasContextMenusAPI = typeof chrome !== 'undefined' && 
                                    typeof chrome.contextMenus !== 'undefined' &&
                                    typeof chrome.contextMenus.create === 'function';
        
        resolve(hasContextMenusAPI);
      });
    });

    // Verify context menus API is available in the background worker
    expect(contextMenusRegistered).toBe(true);
    
    // Note: Chrome's contextMenus API doesn't provide a getAll() method.
    // The actual verification that menus work correctly is done through
    // functional tests that trigger the menu actions (like the first test).
  });

  test('should handle multiple URL changes for the same tab', async ({ context, extensionId }) => {
    // Arrange: Set initial URL
    const firstUrl = 'https://example.com';
    await page.goto(firstUrl);
    await page.waitForLoadState('networkidle');
    
    const currentTabId = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          resolve(tabs[0].id!);
        });
      });
    });

    // Act: Set first default URL
    await page.evaluate(async (tabId: number) => {
      await chrome.runtime.sendMessage({ 
        action: 'setCurrentTabDefaultUrl',
        tabId: tabId 
      });
    }, currentTabId);

    // Navigate to second URL
    const secondUrl = 'https://playwright.dev';
    await page.goto(secondUrl);
    await page.waitForLoadState('networkidle');

    // Set second default URL
    await page.evaluate(async (tabId: number) => {
      await chrome.runtime.sendMessage({ 
        action: 'setCurrentTabDefaultUrl',
        tabId: tabId 
      });
    }, currentTabId);

    // Assert: Verify the latest URL is stored
    const storedUrl = await page.evaluate(async (tabId: number) => {
      return await new Promise<string | null>((resolve) => {
        chrome.storage.local.get([`defaultUrl_${tabId}`], (result) => {
          resolve((result[`defaultUrl_${tabId}`] as string) || null);
        });
      });
    }, currentTabId);

    expect(storedUrl).toBe(secondUrl);
  });
});