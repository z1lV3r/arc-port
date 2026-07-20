import { test, expect } from '../../fixtures.ts';
import type { Page, BrowserContext } from '@playwright/test';

/*
 * Functional Test: Set Checkpoint When Tab is Pinned
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when a user pins a tab, verifying that the checkpoint is set appropriately.
 * 
 * Test Scenarios:
 * 1. When a normal tab is pinned by the user:
 *    - if no checkpoint exists for that tab, the current URL should be saved as checkpoint
 *    - the pinned state should be true
 * 
 * 2. When a tab with an existing checkpoint is pinned:
 *    - the existing checkpoint should remain unchanged
 *    - the tab should be pinned successfully
 */

test.describe('Tab Event - Pin Tab Sets Checkpoint', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeEach(async ({ context: ctx }) => {
    context = ctx;
    // Create a new page for each test
    page = context.pages()[0];
    await page.goto('https://example.com');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should save current URL as checkpoint when pinning a tab without existing checkpoint', async () => {
    const currentUrl = 'https://example.com/';
    
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Get the tab ID for the current page using the page's URL
    const pageUrl = page.url();
    const tabId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.id;
    }, pageUrl);

    expect(tabId).toBeDefined();
    if (tabId === undefined) throw new Error('Expected tabId to be defined');

    // Pin the tab
    await background.evaluate(async (id) => {
      await chrome.tabs.update(id, { pinned: true });
    }, tabId);

    // Verify the tab is now pinned
    const isPinned = await background.evaluate(async (id) => {
      const tab = (await chrome.tabs.get(id)) as chrome.tabs.Tab;
      return tab.pinned;
    }, tabId);

    expect(isPinned).toBe(true);

    // Wait a moment for any potential event processing
    await page.waitForTimeout(1000);

    // Verify the checkpoint remained unchanged (should still be the existing URL, not current)
    const savedUrl = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-checkpoint`);
      return result[`${id}-checkpoint`];
    }, tabId);

    expect(savedUrl).toBe(currentUrl);
  });

  test('should keep existing checkpoint when pinning a tab that already has one', async () => {
    const existingUrl = 'https://existing-default.com/';
    const currentUrl = 'https://example.com/';
    
    // Get the background service worker
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Get the tab ID for the current page using the page's URL
    const pageUrl = page.url();
    const tabId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.id;
    }, pageUrl);

    expect(tabId).toBeDefined();
    if (tabId === undefined) throw new Error('Expected tabId to be defined');

    // Set an existing checkpoint
    await background.evaluate(async ({ id, url }) => {
      await chrome.storage.local.set({ [`${id}-checkpoint`]: url });
    }, { id: tabId, url: existingUrl });

    // Verify the checkpoint was set
    const initialStorage = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-checkpoint`);
      return result[`${id}-checkpoint`];
    }, tabId);

    expect(initialStorage).toBe(existingUrl);

    // Pin the tab
    await background.evaluate(async (id) => {
      await chrome.tabs.update(id, { pinned: true });
    }, tabId);

    // Verify the tab is now pinned
    const isPinned = await background.evaluate(async (id) => {
      const tab = (await chrome.tabs.get(id)) as chrome.tabs.Tab;
      return tab.pinned;
    }, tabId);

    expect(isPinned).toBe(true);

    // Wait a moment for any potential event processing
    await page.waitForTimeout(500);

    // Verify the checkpoint remained unchanged (should still be the existing URL, not current)
    const savedUrl = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-checkpoint`);
      return result[`${id}-checkpoint`];
    }, tabId);

    expect(savedUrl).toBe(existingUrl);
    expect(savedUrl).not.toBe(currentUrl);
  });
});