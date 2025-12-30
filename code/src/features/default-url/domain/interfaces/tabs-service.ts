import { Tab } from "@/features/default-url/domain/models/tab";

export interface TabsService {
  getCurrentTab(): Promise<Tab>;
}
