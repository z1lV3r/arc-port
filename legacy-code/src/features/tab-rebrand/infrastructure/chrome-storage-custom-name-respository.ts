import type { CustomNameRepository } from "../domain/interfaces/custom-name-repository";

export class ChromeStorageCustomNameRepository implements CustomNameRepository {

  private postfix: string;

  constructor(postfix: string = "-custom-name") {
    this.postfix = postfix;
  }

  async save(tabId: string, name: string): Promise<string> {
    const key = tabId + this.postfix;
    await chrome.storage.local.set({ [key]: name });
    return name;
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