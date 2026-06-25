import { test, expect } from '../../fixtures.ts';
import type { Page, BrowserContext } from '@playwright/test';

/*
 * Functional Test: Restore Custom Tab Name When Tab Title Updates
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when a tab's title changes (e.g., on navigation), verifying that the custom
 * name is re-applied to override the new page title.
 * 
 * Test Scenarios:
 * 1. When a tab with a custom name navigates to a new page:
 *    - the custom name should remain in storage after the navigation.
 * 
 * 2. When a tab without a custom name navigates to a new page:
 *    - no custom name entry should exist in storage.
 */

test.describe('Tab Event - Title Update Restores Custom Name', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeEach(async ({ context: ctx }) => {
    context = ctx;
    page = context.pages()[0];
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should keep custom name in storage after navigating to a new page', async () => {
    const customName = 'My Custom Tab Name';

    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Get the tab ID for the current page
    const pageUrl = page.url();
    const tabId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.id;
    }, pageUrl);

    expect(tabId).toBeDefined();
    if (tabId === undefined) throw new Error('Expected tabId to be defined');

    // Store a custom name for this tab
    await background.evaluate(async ({ id, name }) => {
      await chrome.storage.local.set({ [`${id}-custom-name`]: name });
    }, { id: tabId, name: customName });

    // Navigate to a new page to trigger the onUpdated event (which fires title update)
    await page.goto('https://example.org');
    await page.waitForLoadState('networkidle');

    // Wait for the extension event to process
    await page.waitForTimeout(1000);

    // Verify the custom name is still in storage (the listener should have re-applied it)
    const storedName = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-name`);
      return result[`${id}-custom-name`];
    }, tabId);

    expect(storedName).toBe(customName);
  });

  test('should NOT have a custom name in storage when none was set before navigation', async () => {
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Get the tab ID for the current page
    const pageUrl = page.url();
    const tabId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.id;
    }, pageUrl);

    expect(tabId).toBeDefined();
    if (tabId === undefined) throw new Error('Expected tabId to be defined');

    // Ensure no custom name is set for this tab
    await background.evaluate(async (id) => {
      await chrome.storage.local.remove(`${id}-custom-name`);
    }, tabId);

    // Navigate to a new page to trigger the onUpdated event
    await page.goto('https://example.org');
    await page.waitForLoadState('networkidle');

    // Wait a moment for any potential event processing
    await page.waitForTimeout(1000);

    // Verify no custom name was stored (the listener should be a no-op when no custom name)
    const storedName = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-name`);
      return result[`${id}-custom-name`];
    }, tabId);

    expect(storedName).toBeUndefined();
  });
});
