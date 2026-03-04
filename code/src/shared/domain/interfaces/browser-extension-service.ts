export interface BrowserExtensionService {
  onInstalled(callback: () => void): void;
}