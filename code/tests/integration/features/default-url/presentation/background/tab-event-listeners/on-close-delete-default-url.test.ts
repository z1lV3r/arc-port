import { test, expect } from '../../../../../fixtures';
import type { Page, BrowserContext } from '@playwright/test';

/*
 * Functional Test: Remove Default URL When Tab is Closed
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when a user closes a tab, verifying that the default URL is cleaned up.
 * 
 * Test Scenarios:
 * 1. When a tab is closed:
 *    - the default URL associated with that tab ID should be removed from storage.
 * 
 * 2. When one of multiple tabs is closed:
 *    - only the closed tab's default URL should be removed.
 *    - other tabs' default URLs should remain intact.
 */

test.describe('Tab Event - Close Tab Removes Default URL', () => {
  let context: BrowserContext;

  test.beforeEach(async ({ context: ctx }) => {
    context = ctx;
  });

  test('should remove default URL from storage when the tab is closed', async () => {
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

    // Set a default URL for this tab
    const defaultUrl = 'https://example.org/';
    await background.evaluate(async ({ id, url }) => {
      await chrome.storage.local.set({ [`${id}-default-url`]: url });
    }, { id: tabId, url: defaultUrl });

    // Verify it was set
    const storedUrl = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-default-url`);
      return result[`${id}-default-url`];
    }, tabId);

    expect(storedUrl).toBe(defaultUrl);

    // Close the tab
    await page.close();

    // Wait a moment for the event to process
    // Since page is closed, we can't wait on it. We use fixed timeout or poll in background.
    // However, playwright doesn't expose a global 'wait' easily without a page.
    // We can use a small delay helper or create a dummy page if needed, 
    // but the background worker context persists.
    
    // Using a small delay within the background context or just a loop
    await background.evaluate(async () => {
        return new Promise(resolve => setTimeout(resolve, 500));
    });

    // Verify the default URL is gone
    const storedUrlAfterClose = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-default-url`);
      return result[`${id}-default-url`];
    }, tabId);

    expect(storedUrlAfterClose).toBeUndefined();
  });

  test('should NOT affect other tabs default URLs when one is closed', async () => {
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

    // Set default URLs for both
    const url1 = 'https://target1.com/';
    const url2 = 'https://target2.com/';

    await background.evaluate(async ({ id1, u1, id2, u2 }) => {
      await chrome.storage.local.set({ 
        [`${id1}-default-url`]: u1,
        [`${id2}-default-url`]: u2 
      });
    }, { id1: tabId1, u1: url1, id2: tabId2, u2: url2 });

    // Close Tab 1
    await page1.close();

    // Wait for processing
    await background.evaluate(async () => {
        return new Promise(resolve => setTimeout(resolve, 500));
    });

    // Verify Tab 1 data is gone
    const stored1 = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-default-url`);
      return result[`${id}-default-url`];
    }, tabId1);
    expect(stored1).toBeUndefined();

    // Verify Tab 2 data is still there
    const stored2 = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-default-url`);
      return result[`${id}-default-url`];
    }, tabId2);
    expect(stored2).toBe(url2);

    // Cleanup
    await page2.close();
  });
});