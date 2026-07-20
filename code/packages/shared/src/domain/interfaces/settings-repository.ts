export interface SettingsRepository {
  get(key: string): Promise<boolean | string | undefined>;
  getOrDefault(
    key: string,
    defaultValue?: boolean | string,
  ): Promise<boolean | string>;
  set(key: string, value: boolean | string): Promise<void>;
}
