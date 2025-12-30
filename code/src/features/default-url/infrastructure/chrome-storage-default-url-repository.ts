import type { DefaultUrlRepository } from "../domain/interfaces/default-url-repository";

export class ChromeStorageDefaultUrlRepository implements DefaultUrlRepository {
  private prefix: string;

  constructor(prefix: string = "default-url-") {
    this.prefix = prefix;
  }

  async save(tabId: string, url: string): Promise<void> {
    if (!chrome || !chrome.storage) {
      return;
    }
    await chrome.storage.local.set({ [this.prefix + tabId]: url });
  }

  async get(tabId: string): Promise<string> {
    if (!chrome || !chrome.storage) {
      return "";
    }
    const result = await chrome.storage.local.get(this.prefix + tabId);
    return (result[this.prefix + tabId] as string) || "";
  }

  async delete(tabId: string): Promise<void> {
    if (!chrome || !chrome.storage) {
      return;
    }
    await chrome.storage.local.remove(this.prefix + tabId);
  }
}
