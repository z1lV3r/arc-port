import type { Shortcut } from "@/app/domain/shortcut";
import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class CloseOrResetCurrentTabToDefaultUrl implements Shortcut {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "default-url-close-or-reset-current-tab-to-default-url";
  description = "Close or reset current tab to default URL";
  key = {
    default: "Alt+Shift+W",
    mac: "Option+Shift+W",
  };
  command = async () => {
    await this.defaultUrlUseCases.closeOrResetCurrentTabToDefaultUrl();
  };
}
