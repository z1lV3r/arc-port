import { test, expect } from '../fixtures';
import { PlaywrightBrowserMessageService } from '../test-services/playwright-browser-message-service';

test.describe('Rebrand Happy Path', () => {
  let messageService: PlaywrightBrowserMessageService;
  
  test('invoke all the operations using MessageEventSender', async ({ context, extensionId }) => {
    messageService = new PlaywrightBrowserMessageService(context, extensionId);

    //1. Open a new tab to example.com
    const page = await context.newPage();
    await page.goto('https://example.com/');
    await page.waitForLoadState('networkidle');

    //2. Generate emoji data URL the same way the app does (imageUrlToDataUrl)
    const emojiImageUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f600.png';
    const testIconUrl = await page.evaluate(async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }, emojiImageUrl);
    
    //3. Change icon to the emoji
    await messageService.sendSetCurrentTabCustomIconEventMessage(testIconUrl);

    //4. Change name to a text
    await messageService.sendSetCurrentTabCustomNameEventMessage('My Test Tab');

    //5. Validate icon and name
    let iconRes = await messageService.sendGetCurrentTabCustomIconEventMessage();
    expect(iconRes).toBe(testIconUrl);
    let nameRes = await messageService.sendGetCurrentTabCustomNameEventMessage();
    expect(nameRes).toBe('My Test Tab');

    //6. Navigate to a new url
    await page.goto('https://www.ipn.mx/');
    await page.waitForLoadState('networkidle');

    //7. Validate icon and name are the same
    iconRes = await messageService.sendGetCurrentTabCustomIconEventMessage();
    
    expect(iconRes).toBe(testIconUrl);
    nameRes = await messageService.sendGetCurrentTabCustomNameEventMessage();
    expect(nameRes).toBe('My Test Tab');

    //8. Validate icon and name from the web page
    await expect(page).toHaveTitle('My Test Tab');
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', testIconUrl);

    //9. Clear icon and name
    await messageService.sendClearCurrentTabCustomIconEventMessage();
    await messageService.sendClearCurrentTabCustomNameEventMessage();

    //10. Validate icon and name are reset to default
    iconRes = await messageService.sendGetCurrentTabCustomIconEventMessage();
    expect(iconRes).toBe('');
    nameRes = await messageService.sendGetCurrentTabCustomNameEventMessage();
    expect(nameRes).toBe('');
  });
});
