export interface CustomIconRepository {
  save(tabId: string, iconUrl: string): Promise<string>;
  get(tabId: string): Promise<string>;
  delete(tabId: string): Promise<void>;
}
