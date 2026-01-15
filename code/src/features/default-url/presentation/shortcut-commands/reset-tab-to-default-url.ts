import type { Shortcut } from "@/app/domain/shortcut";
import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class ResetTabToDefaultUrl implements Shortcut {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "default-url-reset-tab-to-default-url";
  description = "Reset tab to default URL";
  key = {
    default: "Alt+Shift+R",
    mac: "Option+Shift+R",
  };
  command = async () => {
    await this.defaultUrlUseCases.resetCurrentTabToDefaultUrl();
  };
}
