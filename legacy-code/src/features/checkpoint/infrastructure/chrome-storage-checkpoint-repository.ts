import type { CheckpointRepository } from "../domain/interfaces/checkpoint-repository";

export class ChromeStorageCheckpointRepository implements CheckpointRepository {
  private postfix: string;

  constructor(postfix: string = "-checkpoint") {
    this.postfix = postfix;
  }

  async save(tabId: string, url: string): Promise<void> {
    if (url.startsWith("chrome://")) {
      return;
    }

    if (!chrome || !chrome.storage) {
      return;
    }
    await chrome.storage.local.set({ [tabId + this.postfix]: url });
  }

  async get(tabId: string): Promise<string> {
    if (!chrome || !chrome.storage) {
      return "";
    }
    const result = await chrome.storage.local.get(tabId + this.postfix);
    return (result[tabId + this.postfix] as string) || "";
  }

  async delete(tabId: string): Promise<void> {
    if (!chrome || !chrome.storage) {
      return;
    }
    await chrome.storage.local.remove(tabId + this.postfix);
  }
}
