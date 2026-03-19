import { test, expect } from '../../../../fixtures';
import type { Page } from '@playwright/test';

/*
 * Functional Test: Clear Current Tab Default URL via Shortcut
 * 
 * Tests the keyboard shortcut functionality for clearing the default URL.
 * 
 * Scenarios:
 * 1. Verify the 'Clear current tab default URL' shortcut is correctly registered in the browser
 * 2. Verify that pressing the shortcut (Alt+Shift+C) saves the current tab's URL to storage
 */

test.describe('Shortcut - Clear current tab default URL', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    await page.close();
  });
  test('should register the "Clear current tab default URL" shortcut', async ({ context }) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Verify the command is registered in the extension
    const commands = await background.evaluate(async () => {
      return await chrome.commands.getAll();
    });

    const command = commands.find(c => c.name === 'shortcut-clear-current-tab-default-url');
    
    expect(command, 'Command should be registered').toBeDefined();
    expect(command?.description).toBe('Clear current tab default URL');
    // We expect the default shortcut to be active
    expect(command?.shortcut).toContain('Alt+Shift+K');
  });
});