import { Tab } from "@/features/default-url/domain/models/tab";

export interface TabsService {
  getCurrentTab(): Promise<Tab>;
  getTab(id: string): Promise<Tab>;
  createTab(url: string, index: number): Promise<Tab>;
  closeTab(id: string): Promise<void>;
}
