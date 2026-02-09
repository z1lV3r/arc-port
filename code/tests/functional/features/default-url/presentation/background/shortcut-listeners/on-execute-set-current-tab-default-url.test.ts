import { test, expect } from '../../../../../fixtures';
import type { Page } from '@playwright/test';

/*
 * Functional Test: Set Current Tab Default URL via Shortcut
 * 
 * Tests the keyboard shortcut functionality for setting the default URL.
 * 
 * Scenarios:
 * 1. Verify the 'Set current tab URL' shortcut is correctly registered in the browser
 * 2. Verify that pressing the shortcut (Alt+Shift+S) saves the current tab's URL to storage
 */

test.describe('Shortcut - Set Current Tab Default URL', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    await page.close();
  });
/*
  test('should register the "Set current tab URL" shortcut', async ({ context }) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Verify the command is registered in the extension
    const commands = await background.evaluate(async () => {
      return await chrome.commands.getAll();
    });

    const command = commands.find(c => c.name === 'shortcut-set-current-tab-default-url');
    
    expect(command, 'Command should be registered').toBeDefined();
    expect(command?.description).toBe('Set current tab default URL');
    // We expect the default shortcut to be active
    expect(command?.shortcut).toContain('Alt+Shift+S');
  });
*/
  test('should save current URL as default when shortcut is pressed', async ({ context }) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    const currentUrl = page.url();

    // Get the internal chrome tab ID for the current page
    const tabId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.id;
    }, currentUrl);

    expect(tabId).toBeDefined();

    // Debug: Ensure the background script can identifying the active tab correctly
    const activeTab = await background.evaluate(async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      return tabs[0];
    });
    console.log('Active tab according to background:', activeTab);

    // Simulate the user pressing the shortcut key
    // Ensure the page has focus so the browser captures the shortcut
    await page.bringToFront();
    await page.click('body'); // Explicitly click to ensure focus
    
    // Use manual key sequence for better reliability with modifier keys
    await page.keyboard.down('Alt');
    await page.keyboard.down('Shift');
    await page.keyboard.press('S');
    await page.keyboard.up('Shift');
    await page.keyboard.up('Alt');

    // Verify the URL was saved to storage
    // The key format is "${tabId}-default-url" based on ChromeStorageDefaultUrlRepository
    await expect.poll(async () => {
      return await background.evaluate(async (params) => {
        const { tabId, currentUrl } = params;
        const key = `${tabId}-default-url`;
        const result = await chrome.storage.local.get(key);
        return result[key];
      }, { tabId, currentUrl });
    }, {
      message: 'Tab URL should be saved as default in storage',
      timeout: 500000
    }).toBe(currentUrl);
  });
});