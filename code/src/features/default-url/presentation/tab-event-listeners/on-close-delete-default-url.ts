import type { TabEventListener } from "@/app/domain/models/tab-event-listener";
import type { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class OnCloseRemoveDefaultUrl implements TabEventListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(useCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = useCases;
  }

  name = "default-url-on-tab-close-remove-default-url";
  command = async (tabId: string) => {
    await this.defaultUrlUseCases.clearTabDefaultUrl(tabId);
  };
}
