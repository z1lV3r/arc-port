export interface OriginalNameRepository {
  save(tabId: string, name: string): Promise<string>;
  get(tabId: string): Promise<string>;
  delete(tabId: string): Promise<void>;
}