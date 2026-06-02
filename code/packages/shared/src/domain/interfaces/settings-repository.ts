export interface SettingsRepository {
  get(key: string): Promise<boolean | undefined>;
  getOrDefault(key: string, defaultValue?: boolean): Promise<boolean>;
  set(key: string, value: boolean): Promise<void>;
}
