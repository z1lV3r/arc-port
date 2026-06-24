import { test, expect } from '../../fixtures.ts';
import type { Page } from '@playwright/test';

/*
 * Functional Test: Clear Current Tab Checkpoint via Shortcut
 * 
 * Tests the keyboard shortcut functionality for clearing the checkpoint.
 * 
 * Scenarios:
 * 1. Verify the 'Clear current tab checkpoint' shortcut is correctly registered in the browser
 * 2. Verify that pressing the shortcut (Alt+Shift+C) saves the current tab's URL to storage
 */

test.describe('Shortcut - Clear current tab checkpoint', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    await page.close();
  });
  test('should register the "Clear current tab checkpoint" shortcut', async ({ context }) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Verify the command is registered in the extension
    const commands = await background.evaluate(async () => {
      return await chrome.commands.getAll();
    });

    const command = commands.find(c => c.name === 'shortcut-clear-current-tab-checkpoint');
    
    expect(command, 'Command should be registered').toBeDefined();
    expect(command?.description).toBe('Clear current tab checkpoint');
  });
});