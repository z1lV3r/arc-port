import { test, expect } from '../../../fixtures';
import { PlaywrightBrowserMessageService } from '../test-services/playwright-browser-message-service';

test.describe('Checkpoint Happy Path', () => {
  let messageService: PlaywrightBrowserMessageService;
  
  test('invoke all the operations using MessageEventSender', async ({ context, extensionId }) => {
    messageService = new PlaywrightBrowserMessageService(context, extensionId);

    // 1. Open new tab https://example.com
    const page = await context.newPage();
    await page.goto('https://example.com/');
    await page.waitForLoadState('networkidle');

    // 2. Set Checkpoint
    await messageService.sendSetCurrentTabCheckpointEventMessage();
    
    // - Validate there should be a checkpoint
    let defaultUrlRes = await messageService.sendGetCurrentTabCheckpointEventMessage();
    expect(defaultUrlRes).toBe('https://example.com/');

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
    defaultUrlRes = await messageService.sendGetCurrentTabCheckpointEventMessage();
    expect(defaultUrlRes).toBe('https://example.com/');

    // 4. Go to a different url
    await resetPage.goto('https://example.org/');
    await resetPage.waitForLoadState('networkidle');

    // - Validate there should not be any change in checkpoint
    defaultUrlRes = await messageService.sendGetCurrentTabCheckpointEventMessage();
    expect(defaultUrlRes).toBe('https://example.com/');

    // 5. Reset or close tab to checkpoint
    const finalPagePromise = context.waitForEvent('page', {
      predicate: (p) => !p.url().startsWith('chrome-extension://') && !p.url().startsWith('about:'),
    });
    await messageService.sendResetOrCloseCurrentTabToCheckpointEventMessage();
    const finalPage = await finalPagePromise;

    // - Validate there should be a checkpoint with the new tab id
    await finalPage.waitForLoadState('load');
    await expect(finalPage).toHaveURL('https://example.com/');
    defaultUrlRes = await messageService.sendGetCurrentTabCheckpointEventMessage();
    expect(defaultUrlRes).toBe('https://example.com/');

    // 6. Clear   checkpoint
    await messageService.sendClearCurrentTabCheckpointEventMessage();
    
    // - Validate there should not be any checkpoint
    defaultUrlRes = await messageService.sendGetCurrentTabCheckpointEventMessage();
    expect(defaultUrlRes).toBe('');
  });
});
