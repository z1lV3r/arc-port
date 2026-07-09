import type { SettingsRepository } from "../domain/interfaces/settings-repository";

export class ChromeStorageSettingsRepository implements SettingsRepository {
  async get(key: string): Promise<boolean | undefined> {
    const result = await chrome.storage.local.get(key);
    return (result[key] as boolean) ?? undefined;
  }

  async getOrDefault(key: string, defaultValue?: boolean): Promise<boolean> {
    const result = await chrome.storage.local.get(key);
    return (result[key] as boolean) ?? defaultValue ?? false;
  }

  async set(key: string, value: boolean): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
  }
}
