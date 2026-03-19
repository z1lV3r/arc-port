import { test, expect } from '../../../../fixtures';
import type { Page } from '@playwright/test';

/*
 * Functional Test: Reset Current Tab to Default URL via Shortcut
 * 
 * Tests the keyboard shortcut functionality for resetting the current tab to default URL.
 * 
 * Scenarios:
 * 1. Verify the 'Reset current tab URL' shortcut is correctly registered in the browser
 * 2. Verify that pressing the shortcut (Alt+Shift+S) saves the current tab's URL to storage
 */

test.describe('Shortcut - Reset current tab to default URL', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    await page.close();
  });
  test('should register the "Reset current tab to default URL" shortcut', async ({ context }) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Verify the command is registered in the extension
    const commands = await background.evaluate(async () => {
      return await chrome.commands.getAll();
    });

    const command = commands.find(c => c.name === 'shortcut-reset-current-tab-to-default-url');
    
    expect(command, 'Command should be registered').toBeDefined();
    expect(command?.description).toBe('Reset current tab to default URL');
    // We expect the default shortcut to be active
    expect(command?.shortcut).toContain('Alt+Shift+R');
  });
});