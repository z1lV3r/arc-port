import type { SettingsRepository } from "../domain/interfaces/settings-repository";

export class ChromeStorageSettingsRepository implements SettingsRepository {
    async get(key: string, defaultValue?: boolean): Promise<boolean> {
        const result = await chrome.storage.local.get(key);
        return result[key] !== undefined ? Boolean(result[key]) : (defaultValue ?? false);
    }

    async set(key: string, value: boolean): Promise<void> {
        await chrome.storage.local.set({ [key]: value });
    }
}