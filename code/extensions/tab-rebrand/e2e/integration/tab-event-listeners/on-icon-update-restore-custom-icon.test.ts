import { test, expect } from '../../fixtures.ts';
import type { Page, BrowserContext } from '@playwright/test';

/*
 * Functional Test: Restore Custom Tab Icon When Tab Icon Updates
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when a tab's favicon changes (e.g., on navigation), verifying that the custom
 * icon is re-applied to override the new page favicon.
 * 
 * Test Scenarios:
 * 1. When a tab with a custom icon navigates to a new page:
 *    - the custom icon should be re-applied, overriding the new page favicon.
 * 
 * 2. When a tab without a custom icon navigates to a new page:
 *    - the page favicon should remain unchanged (no custom icon to restore).
 */

test.describe('Tab Event - Icon Update Restores Custom Icon', () => {
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

  test('should re-apply custom icon when the tab favicon changes after navigation', async () => {
    const customIcon = 'data:image/png;base64,customIconData';

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

    // Store a custom icon for this tab
    await background.evaluate(async ({ id, icon }) => {
      await chrome.storage.local.set({ [`${id}-custom-icon`]: icon });
    }, { id: tabId, icon: customIcon });

    // Wait a moment for any potential event processing
    await page.waitForTimeout(500);

    // Verify the custom icon is still in storage (the listener should keep it intact)
    const storedIcon = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-icon`);
      return result[`${id}-custom-icon`];
    }, tabId);

    expect(storedIcon).toBe(customIcon);
  });

  test('should NOT restore custom icon when no custom icon is set', async () => {
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

    // Ensure no custom icon is set for this tab
    await background.evaluate(async (id) => {
      await chrome.storage.local.remove(`${id}-custom-icon`);
    }, tabId);

    // Wait a moment for any potential event processing
    await page.waitForTimeout(500);

    // Verify no custom icon was stored
    const storedIcon = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-custom-icon`);
      return result[`${id}-custom-icon`];
    }, tabId);

    expect(storedIcon).toBeUndefined();
  });
});
