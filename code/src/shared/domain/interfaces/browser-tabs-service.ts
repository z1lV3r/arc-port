import { Tab } from "@/shared/domain/models/tab";

export interface BrowserTabsService {
  getCurrentTab(): Promise<Tab>;
  getTab(id: string): Promise<Tab>;
  createTab(url: string, index?: number, groupId?: number, pinned?: boolean): Promise<Tab>;
  closeTab(id: string): Promise<void>;
}
