import { test, expect } from '../../fixtures.ts';
import type { BrowserContext } from '@playwright/test';

/*
 * Functional Test: Clear Custom Name and Icon When Tab is Closed
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when a user closes a tab, verifying that the custom name and icon are cleaned up.
 * 
 * Test Scenarios:
 * 1. When a tab is closed:
 *    - the custom name associated with that tab ID should be removed from storage.
 *    - the custom icon associated with that tab ID should be removed from storage.
 * 
 * 2. When one of multiple tabs is closed:
 *    - only the closed tab's custom name and icon should be removed.
 *    - other tabs' custom name and icon should remain intact.
 */

test.describe('Tab Event - Close Tab Clears Custom Name and Icon', () => {
  let context: BrowserContext;

  test.beforeEach(async ({ context: ctx }) => {
    context = ctx;
  });

  test('should remove custom name and icon from storage when the tab is closed', async () => {
    // Create a new page
    const page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
    
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Get the tab ID
    const pageUrl = page.url();
    const tabId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.id;
    }, pageUrl);

    expect(tabId).toBeDefined();

    // Set custom name and icon for this tab
    const customName = 'My Custom Tab Name';
    const customIcon = 'data:image/png;base64,abc123';
    await background.evaluate(async ({ id, name, icon }) => {
      await chrome.storage.local.set({
        [`${id}-custom-name`]: name,
        [`${id}-custom-icon`]: icon,
      });
    }, { id: tabId, name: customName, icon: customIcon });

    // Verify they were set
    const storedName = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-name`);
      return result[`${id}-custom-name`];
    }, tabId);
    const storedIcon = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-icon`);
      return result[`${id}-custom-icon`];
    }, tabId);

    expect(storedName).toBe(customName);
    expect(storedIcon).toBe(customIcon);

    // Close the tab
    await page.close();

    // Wait a moment for the event to process
    await background.evaluate(async () => {
      return new Promise(resolve => setTimeout(resolve, 500));
    });

    // Verify the custom name is gone
    const storedNameAfterClose = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-name`);
      return result[`${id}-custom-name`];
    }, tabId);
    expect(storedNameAfterClose).toBeUndefined();

    // Verify the custom icon is gone
    const storedIconAfterClose = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-icon`);
      return result[`${id}-custom-icon`];
    }, tabId);
    expect(storedIconAfterClose).toBeUndefined();
  });

  test('should NOT affect other tabs custom name and icon when one is closed', async () => {
    // Create two pages
    const page1 = await context.newPage();
    await page1.goto('https://example.com/1');
    const page2 = await context.newPage();
    await page2.goto('https://example.com/2');
    
    await page1.waitForLoadState('networkidle');
    await page2.waitForLoadState('networkidle');

    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Get Tab IDs
    const tabId1 = await background.evaluate(async () => {
      const tabs = await chrome.tabs.query({ url: 'https://example.com/1' });
      return tabs[0]?.id;
    });
    const tabId2 = await background.evaluate(async () => {
      const tabs = await chrome.tabs.query({ url: 'https://example.com/2' });
      return tabs[0]?.id;
    });

    expect(tabId1).toBeDefined();
    expect(tabId2).toBeDefined();

    // Set custom name and icon for both tabs
    const name1 = 'Tab One Name';
    const name2 = 'Tab Two Name';
    const icon1 = 'data:image/png;base64,icon1';
    const icon2 = 'data:image/png;base64,icon2';

    await background.evaluate(async ({ id1, n1, i1, id2, n2, i2 }) => {
      await chrome.storage.local.set({
        [`${id1}-custom-name`]: n1,
        [`${id1}-custom-icon`]: i1,
        [`${id2}-custom-name`]: n2,
        [`${id2}-custom-icon`]: i2,
      });
    }, { id1: tabId1, n1: name1, i1: icon1, id2: tabId2, n2: name2, i2: icon2 });

    // Close Tab 1
    await page1.close();

    // Wait for processing
    await background.evaluate(async () => {
      return new Promise(resolve => setTimeout(resolve, 500));
    });

    // Verify Tab 1 custom name and icon are gone
    const storedName1 = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-name`);
      return result[`${id}-custom-name`];
    }, tabId1);
    expect(storedName1).toBeUndefined();

    const storedIcon1 = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-icon`);
      return result[`${id}-custom-icon`];
    }, tabId1);
    expect(storedIcon1).toBeUndefined();

    // Verify Tab 2 custom name and icon are still there
    const storedName2 = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-name`);
      return result[`${id}-custom-name`];
    }, tabId2);
    expect(storedName2).toBe(name2);

    const storedIcon2 = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-icon`);
      return result[`${id}-custom-icon`];
    }, tabId2);
    expect(storedIcon2).toBe(icon2);

    // Cleanup
    await page2.close();
  });
});
