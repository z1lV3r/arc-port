import { test, expect } from '../../../../fixtures';
import { PlaywrightBrowserMessageService } from '../../test-services/playwright-browser-message-service';

test.describe('Default URL Edge Case', () => {
  let messageService: PlaywrightBrowserMessageService;
  
  test('reset first tab in window', async ({ context, extensionId }) => {
    messageService = new PlaywrightBrowserMessageService(context, extensionId);

    // 1. Open new tab https://example.com
    const page = context.pages()[0];
    await page.goto('https://example.com/');
    await page.waitForLoadState('networkidle');

    // 2. Set default url
    await messageService.sendSetCurrentTabDefaultUrlEventMessage();
    
    // - Validate there should be a default url
    let defaultUrlRes = await messageService.sendGetCurrentTabDefaultUrlEventMessage();
    expect(defaultUrlRes).toBe('https://example.com/');

    // 3. Reset tab to default url
    // Go to a different URL first to see if it resets
    await page.goto('https://example.net/');
    await page.waitForLoadState('networkidle');
    // options page that sendEventMessage opens internally.
    const resetPagePromise = context.waitForEvent('page', {
      predicate: (p) => !p.url().startsWith('chrome-extension://') && !p.url().startsWith('about:'),
    });
    await messageService.sendResetCurrentTabToDefaultUrlEventMessage();
    const resetPage = await resetPagePromise;

    // - Validate there should be a default url with the new tab id
    await resetPage.waitForLoadState('load');
    await expect(resetPage).toHaveURL('https://example.com/');
    defaultUrlRes = await messageService.sendGetCurrentTabDefaultUrlEventMessage();
    expect(defaultUrlRes).toBe('https://example.com/');
  });
});
