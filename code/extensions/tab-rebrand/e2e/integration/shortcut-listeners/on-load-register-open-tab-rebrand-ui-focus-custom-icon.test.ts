import { test, expect } from '../../fixtures.ts';
import type { Page } from '@playwright/test';

/*
 * Functional Test: Open Tab Rebrand UI (Focus Custom Icon) via Shortcut
 * 
 * Tests the keyboard shortcut functionality for opening the rebrand UI focused on custom icon.
 * 
 * Scenarios:
 * 1. Verify the 'Open tab rebrand UI focus custom icon' shortcut is correctly registered in the browser
 */

test.describe('Shortcut - Open tab rebrand UI focus custom icon', () => {
  let page: Page;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    await page.goto('https://example.com');
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    await page.close();
  });
  test('should register the "Open tab rebrand UI focus custom icon" shortcut', async ({ context }) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Verify the command is registered in the extension
    const commands = await background.evaluate(async () => {
      return await chrome.commands.getAll();
    });

    const command = commands.find(c => c.name === 'shortcut-open-tab-rebrand-ui-focus-custom-icon');
    
    expect(command, 'Command should be registered').toBeDefined();
    expect(command?.description).toBe('Edit custom tab icon');
  });
});
