export interface BrowserService {
  openPopup(focusElementId?: string): Promise<void>;
}