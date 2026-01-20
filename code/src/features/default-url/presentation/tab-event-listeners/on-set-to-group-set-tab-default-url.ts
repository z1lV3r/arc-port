import type { TabEventListener } from "@/app/domain/models/tab-event-listener";
import type { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class OnSetToGroupSetTabDefaultUrl implements TabEventListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(useCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = useCases;
  }

  name = "on-set-to-group-set-tab-default-url";
  command = async (tabId: string) => {
    await this.defaultUrlUseCases.setTabDefaultUrlIfUnsetByTabId(tabId);
  };
}
