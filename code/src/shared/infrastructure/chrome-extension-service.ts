import type { BrowserExtensionService } from "../domain/interfaces/browser-extension-service";

export class ChromeExtensionService implements BrowserExtensionService {
  private callbacks: (() => void)[];

  constructor() {
    this.callbacks = [];
    chrome.runtime.onInstalled.addListener(() => {
      for (const callback of this.callbacks) {
        callback();
      }
    });
  }

  onInstalled(callback: () => void): void {
    this.callbacks.push(callback);
  }
}