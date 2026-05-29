export interface OriginalTabInformationService {
  getOriginalName(tabId: string): Promise<string>;
  getOriginalIcon(tabId: string): Promise<string>;
}