import type { CustomIconRepository } from "../domain/interfaces/custom-icon-repository";

export class ChromeStorageCustomIconRepository implements CustomIconRepository {

  private postfix: string;

  constructor(postfix: string = "-custom-icon") {
    this.postfix = postfix;
  }

  async save(tabId: string, iconUrl: string): Promise<string> {
    const key = tabId + this.postfix;
    await chrome.storage.local.set({ [key]: iconUrl });
    return iconUrl;
  }

  async get(tabId: string): Promise<string> {
    const key = tabId + this.postfix;
    const result: any = await chrome.storage.local.get(key);
    return result[key] || "";
  }

  async delete(tabId: string): Promise<void> {
    const key = tabId + this.postfix;
    await chrome.storage.local.remove(key);
  }
}