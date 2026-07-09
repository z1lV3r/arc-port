import type { OriginalNameRepository } from "../domain/interfaces/original-name-repository";

export class ChromeStorageOriginalNameRepository implements OriginalNameRepository {

  private postfix: string;

  constructor(postfix: string = "-original-name") {
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