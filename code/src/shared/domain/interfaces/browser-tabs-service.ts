import { Tab } from "@/shared/domain/models/tab";

export interface BrowserTabsService {
  getCurrentTab(): Promise<Tab>;
  getTab(id: string): Promise<Tab>;
  createTabByUrl(url: string): Promise<Tab>;
  createTab(tab: Tab): Promise<Tab>;
  closeTab(id: string): Promise<void>;
  setCustomName(id: string, customName: string): Promise<void>;
}
