export interface BrowserService {
  loadPage(url: string): Promise<void>;
}