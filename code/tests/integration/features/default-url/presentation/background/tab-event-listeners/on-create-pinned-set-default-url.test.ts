import { test, expect } from '../../../../../fixtures';
import type { Page, BrowserContext } from '@playwright/test';

/*
 * Functional Test: Set Default URL When Pinned Tab is Created
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when a user creates a new pinned tab (or duplicates one), verifying that the default URL is set appropriately.
 * 
 * Test Scenarios:
 * 1. When a pinned tab is created (e.g. via duplicate or create with pinned: true):
 *    - if no default URL exists for that tab, the current URL should be saved as default.
 *    - the tab should be pinned.
 * 
 * 2. When an unpinned tab is created:
 *    - no default URL should be set (regression check).
 */

test.describe('Tab Event - Create Pinned Tab Sets Default URL', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeEach(async ({ context: ctx }) => {
    context = ctx;
    // Create a new page for each test to have a clean state context
    page = await context.newPage();
    await page.goto('https://example.com');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should save current URL as default when creating a new pinned tab', async () => {
    const targetUrl = 'https://example.org/';
    
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Create a new pinned tab via API
    const newTabId = await background.evaluate(async (url) => {
      const tab = await chrome.tabs.create({ url, pinned: true, active: false });
      return tab.id;
    }, targetUrl);

    expect(newTabId).toBeDefined();

    // Verify the tab is pinned
    const isPinned = await background.evaluate(async (id) => {
      const tab = await chrome.tabs.get(id);
      return tab.pinned;
    }, newTabId);

    expect(isPinned).toBe(true);

    // Wait a moment for any potential event processing
    await page.waitForTimeout(1000);

    // Verify the default URL was saved
    const savedUrl = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-default-url`);
      return result[`${id}-default-url`];
    }, newTabId);

    // Note: Chrome might add a trailing slash to the URL
    expect(savedUrl).toMatch(/https:\/\/example\.org\/?/);
  });

  test('should NOT set default URL when creating a new UNPINNED tab', async () => {
    const targetUrl = 'https://example.net/';
    
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Create a new unpinned tab via API
    const newTabId = await background.evaluate(async (url) => {
      const tab = await chrome.tabs.create({ url, pinned: false, active: false });
      return tab.id;
    }, targetUrl);

    expect(newTabId).toBeDefined();

    // Verify the tab is NOT pinned
    const isPinned = await background.evaluate(async (id) => {
      const tab = await chrome.tabs.get(id);
      return tab.pinned;
    }, newTabId);

    expect(isPinned).toBe(false);

    // Wait a moment for any potential event processing
    await page.waitForTimeout(1000);

    // Verify the default URL was NOT saved
    const savedUrl = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-default-url`);
      return result[`${id}-default-url`];
    }, newTabId);

    expect(savedUrl).toBeUndefined();
  });
});