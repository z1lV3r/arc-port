import type { BrowserMessageService } from "../domain/interfaces/browser-message-service";

export class ChromeMessageService implements BrowserMessageService {
  sendEventMessage(listenerName: string, message: any): Promise<any> {
    return chrome.runtime.sendMessage({ ...message, listenerName });
  }
}
