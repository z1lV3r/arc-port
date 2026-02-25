export interface SettingsRepository {
    get(key: string, defaultValue?: boolean): Promise<boolean>;
    set(key: string, value: boolean): Promise<void>;
}