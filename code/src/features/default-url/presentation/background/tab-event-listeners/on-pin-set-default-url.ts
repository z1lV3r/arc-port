import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";

export class OnPinSetDefaultUrl implements TabEventListener {
  private readonly setDefaultUrlUseCases: SetDefaultUrlUseCases;

  constructor(setDefaultUrlUseCases: SetDefaultUrlUseCases) {
    this.setDefaultUrlUseCases = setDefaultUrlUseCases;
  }

  name = "on-pin-set-default-url";
  description = "Set tab default url if unset by tab id";
  command = async (args: { tabId: string }) => {
    await this.setDefaultUrlUseCases.setTabDefaultUrlIfUnset(args.tabId);
  };
}
