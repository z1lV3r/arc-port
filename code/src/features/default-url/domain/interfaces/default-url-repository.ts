export interface DefaultUrlRepository {
  save(tabId: string, url: string): Promise<void>;
  get(tabId: string): Promise<string>;
  delete(tabId: string): Promise<void>;
}
