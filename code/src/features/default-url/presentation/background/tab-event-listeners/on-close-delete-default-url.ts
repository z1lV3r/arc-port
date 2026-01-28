import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import type { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class OnCloseRemoveDefaultUrl implements TabEventListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(useCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = useCases;
  }

  name = "on-tab-close-remove-default-url";
  description = "Remove default url when tab is closed";
  command = async (args: { tabId: string }) => {
    await this.defaultUrlUseCases.clearTabDefaultUrl(args.tabId);
  };
}
