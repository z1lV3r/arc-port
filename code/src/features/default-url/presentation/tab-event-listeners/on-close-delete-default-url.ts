import type { TabEventListener } from "@/app/domain/tab-event-listener";
import type { DefaultUrlRepository } from "@/features/default-url/domain/interfaces/default-url-repository";

export class OnCloseRemoveDefaultUrl implements TabEventListener {
  private readonly defaultUrlRepository: DefaultUrlRepository;

  constructor(defaultUrlRepository: DefaultUrlRepository) {
    this.defaultUrlRepository = defaultUrlRepository;
  }

  name = "default-url-on-tab-close-remove-default-url";
  command = async (tabId: string) => {
    await this.defaultUrlRepository.delete(tabId);
  };
}
