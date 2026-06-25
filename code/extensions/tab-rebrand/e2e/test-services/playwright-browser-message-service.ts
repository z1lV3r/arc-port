import type { BrowserContext } from '@playwright/test';

export class PlaywrightBrowserMessageService {
  private context: BrowserContext;
  private extensionId: string;

  constructor(context: BrowserContext, extensionId: string) {
    this.context = context;
    this.extensionId = extensionId;
  }

  async sendEventMessage(listenerName: string, message: any): Promise<any> {
    const page = await this.context.newPage();
    try {
      await page.goto(`chrome-extension://${this.extensionId}/options.html`);
      
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

  async sendSetCurrentTabCustomNameEventMessage(name: string): Promise<string> {
    return (await this.sendEventMessage("set-current-tab-custom-name-message-event-listener", { name })).data;
  }

  async sendGetCurrentTabCustomNameEventMessage(): Promise<string> {
    return (await this.sendEventMessage("get-current-tab-custom-name-message-event-listener", {})).data;
  }

  async sendClearCurrentTabCustomNameEventMessage(): Promise<void> {
    await this.sendEventMessage("clear-current-tab-custom-name-message-event-listener", {});
  }

  async sendSetCurrentTabCustomIconEventMessage(icon: string): Promise<string> {
    return (await this.sendEventMessage("set-current-tab-custom-icon-message-event-listener", { iconUrl: icon })).data;
  }

  async sendGetCurrentTabCustomIconEventMessage(): Promise<string> {
    return (await this.sendEventMessage("get-current-tab-custom-icon-message-event-listener", {})).data;
  }

  async sendClearCurrentTabCustomIconEventMessage(): Promise<void> {
    await this.sendEventMessage("clear-current-tab-custom-icon-message-event-listener", {});
  }
}