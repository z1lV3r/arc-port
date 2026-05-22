export interface OriginalIconRepository {
  save(tabId: string, iconUrl: string): Promise<string>;
  get(tabId: string): Promise<string>;
  delete(tabId: string): Promise<void>;
}