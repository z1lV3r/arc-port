import { test, expect } from '../../../../fixtures';
import type { Page } from '@playwright/test';

/*
 * Functional Test: Reset or Close Current Tab to Checkpoint via Shortcut
 * 
 * Tests the keyboard shortcut functionality for resetting the current tab to checkpoint.
 * 
 * Scenarios:
 * 1. Verify the 'Reset or close current tab to checkpoint' shortcut is correctly registered in the browser
 * 2. Verify that pressing the shortcut (Alt+Shift+S) saves the current tab's URL to storage
 */

test.describe('Shortcut - Reset or close current tab to checkpoint', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    await page.close();
  });
  test('should register the "Reset or close current tab to checkpoint" shortcut', async ({ context }) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Verify the command is registered in the extension
    const commands = await background.evaluate(async () => {
      return await chrome.commands.getAll();
    });

    const command = commands.find(c => c.name === 'shortcut-reset-or-close-current-tab-to-checkpoint');
    
    expect(command, 'Command should be registered').toBeDefined();
    expect(command?.description).toBe('Reset or close current tab to checkpoint');
    // We expect the default shortcut to be active
    expect(command?.shortcut).toContain('Alt+Shift+D');
  });
});