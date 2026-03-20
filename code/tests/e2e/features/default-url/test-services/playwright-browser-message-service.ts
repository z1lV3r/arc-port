import type { BrowserMessageService } from '@/shared/domain/interfaces/browser-message-service';
import type { BrowserContext } from '@playwright/test';

export class PlaywrightBrowserMessageService implements BrowserMessageService {
  private context: BrowserContext;
  private extensionId: string;

  constructor(context: BrowserContext, extensionId: string) {
    this.context = context;
    this.extensionId = extensionId;
  }

  async sendEventMessage(listenerName: string, message: any): Promise<any> {
    const page = await this.context.newPage();
    try {
      await page.goto(`chrome-extension://${this.extensionId}/src/options.html`);
      
      const pages = this.context.pages();
      const examplePage = pages.find(p => p !== page && !p.url().startsWith('chrome-extension://') && !p.url().startsWith('about:'));
      if (examplePage) {
        await examplePage.bringToFront();
      }

      const response = await page.evaluate(async (args) => {
        return await new Promise((resolve) => {
          chrome.runtime.sendMessage({ ...args.message, listenerName: args.listenerName }, resolve);
        });
      }, { listenerName, message });

      return response;
    } finally {
      await page.close();
      const remainPages = this.context.pages();
      const current = remainPages.find(p => !p.url().startsWith('chrome-extension://') && !p.url().startsWith('about:'));
      if (current) {
        await current.bringToFront();
      }
    }
  }

  async sendSetCurrentTabDefaultUrlEventMessage(): Promise<string> {
    return (await this.sendEventMessage("set-current-tab-default-url-message-event-listener", {})).data;
  }

  async sendSetTabDefaultUrlIfUnsetMessageEventMessage(tabId: number): Promise<string> {
    return (await this.sendEventMessage("set-tab-default-url-if-unset-message-event-listener", { tabId })).data;
  }

  async sendGetCurrentTabDefaultUrlEventMessage(): Promise<string> {
    return (await this.sendEventMessage("get-current-tab-default-url-message-event-listener", {})).data;
  }

  async sendResetCurrentTabToDefaultUrlEventMessage(): Promise<void> {
    await this.sendEventMessage("reset-current-tab-to-default-url-message-event-listener", {});
  }

  async sendResetOrCloseCurrentTabToDefaultUrlEventMessage(): Promise<void> {
    await this.sendEventMessage("reset-or-close-current-tab-to-default-url-message-event-listener", {});
  }

  async sendClearCurrentTabDefaultUrlEventMessage(): Promise<void> {
    await this.sendEventMessage("clear-current-tab-default-url-message-event-listener", {});
  }

  async sendClearTabDefaultUrlEventMessage(tabId: string): Promise<void> {
    await this.sendEventMessage("clear-tab-default-url-message-event-listener", { tabId });
  }
}