import { Tab } from "../models/tab";

export interface BrowserTabsService {
  exists(id: string): Promise<boolean>;

  getCurrentTab(): Promise<Tab>;
  getTab(id: string): Promise<Tab>;
  createTabByUrl(url: string): Promise<Tab>;
  createTab(tab: Tab): Promise<Tab>;
  closeTab(id: string): Promise<void>;

  getTabName(id: string): Promise<string>;
  setTabName(id: string, customName: string): Promise<void>;

  getTabIcon(id: string): Promise<string>;
  setTabIcon(id: string, customIcon: string): Promise<void>;
}
