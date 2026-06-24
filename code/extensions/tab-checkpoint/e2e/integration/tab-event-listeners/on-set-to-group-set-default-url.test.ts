import { test, expect } from '../../fixtures.ts';
import type { Page, BrowserContext } from '@playwright/test';

/*
 * Functional Test: Set Checkpoint When Tab is Added to a Group
 * 
 * End-to-end testing approach: We test the actual Chrome extension behavior
 * when a user adds a tab to a group, verifying that the checkpoint is set appropriately.
 * 
 * Test Scenarios:
 * 1. When a normal tab is moved to a group by the user:
 *    - if no checkpoint exists for that tab, the current URL should be saved as checkpoint.
 *    - the tab should be in a group.
 * 
 * 2. When a tab with an existing checkpoint is moved to a group:
 *    - the existing checkpoint should remain unchanged.
 *    - the tab should be in a group.
 */

test.describe('Tab Event - Group Tab Sets Checkpoint', () => {
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

  test('should save current URL as checkpoint when moving a tab to a group without existing checkpoint', async () => {
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

    // Group the tab (create a new group)
    const groupId = await background.evaluate(async (id) => {
      return await chrome.tabs.group({ tabIds: id });
    }, tabId);

    expect(groupId).toBeDefined();
    expect(groupId).not.toBe(-1); // -1 often means no group in some contexts, though group() returns specific ID

    // Verify the tab is now in a group
    const tabGroupId = await background.evaluate(async (id) => {
      const tab = (await chrome.tabs.get(id)) as chrome.tabs.Tab;
      return tab.groupId;
    }, tabId);

    expect(tabGroupId).toBe(groupId);

    // Wait a moment for any potential event processing
    await page.waitForTimeout(1000);

    // Verify the checkpoint was saved
    const savedUrl = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-checkpoint`);
      return result[`${id}-checkpoint`];
    }, tabId);

    expect(savedUrl).toBe(currentUrl);
  });

  test('should keep existing checkpoint when moving a tab to a group that already has one', async () => {
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

    // Group the tab
    const groupId = await background.evaluate(async (id) => {
      return await chrome.tabs.group({ tabIds: id });
    }, tabId);

    expect(groupId).toBeDefined();

    // Verify the tab is now in a group
    const tabGroupId = await background.evaluate(async (id) => {
      const tab = (await chrome.tabs.get(id)) as chrome.tabs.Tab;
      return tab.groupId;
    }, tabId);

    expect(tabGroupId).toBe(groupId);

    // Wait a moment for any potential event processing
    await page.waitForTimeout(500);

    // Verify the checkpoint remained unchanged
    const savedUrl = await background.evaluate(async (id) => {
      const result = await chrome.storage.local.get(`${id}-checkpoint`);
      return result[`${id}-checkpoint`];
    }, tabId);

    expect(savedUrl).toBe(existingUrl);
    expect(savedUrl).not.toBe(currentUrl);
  });
});