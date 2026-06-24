import { test, expect } from '../../fixtures';
import { PlaywrightBrowserMessageService } from '../../test-services/playwright-browser-message-service';

test.describe('Checkpoint Edge Case', () => {
  let messageService: PlaywrightBrowserMessageService;
  
  test('reset first tab in group tabs', async ({ context, extensionId }) => {
    messageService = new PlaywrightBrowserMessageService(context, extensionId);

    // 1. Open new tab https://example.com
    const page = context.pages()[0];
    await page.goto('https://example.com/');
    await page.waitForLoadState('networkidle');

    // 2. Set page to a tab group
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    // Get the current tab ID by matching on page URL
    const tabId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.id;
    }, page.url());

    expect(tabId).toBeDefined();
    if (tabId === undefined) throw new Error('Expected tabId to be defined');

    // Add the tab to a new group (simulates the user grouping the tab)
    const groupId = await background.evaluate(async (id) => {
      return await chrome.tabs.group({ tabIds: [id] });
    }, tabId);
    
    // - Validate there should be a checkpoint
    let checkpointUrl = await messageService.sendGetCurrentTabCheckpointEventMessage();
    expect(checkpointUrl).toBe('https://example.com/');

    // 3. Reset tab to checkpoint
    // Go to a different URL first to see if it resets
    await page.goto('https://example.net/');
    await page.waitForLoadState('networkidle');
    // options page that sendEventMessage opens internally.
    const resetPagePromise = context.waitForEvent('page', {
      predicate: (p) => !p.url().startsWith('chrome-extension://') && !p.url().startsWith('about:'),
    });
    await messageService.sendResetCurrentTabToCheckpointEventMessage();
    const resetPage = await resetPagePromise;

    // - Validate there should be a checkpoint with the new tab id
    await resetPage.waitForLoadState('load');
    await expect(resetPage).toHaveURL('https://example.com/');
    checkpointUrl = await messageService.sendGetCurrentTabCheckpointEventMessage();
    expect(checkpointUrl).toBe('https://example.com/');

    // the new page should be in the same group as the previous page
    const resetTabGroupId = await background.evaluate(async (url) => {
      const tabs = await chrome.tabs.query({ url });
      return tabs[0]?.groupId;
    }, resetPage.url());

    expect(resetTabGroupId).toBe(groupId);
  });
});
