import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class ResetTabToDefaultUrl implements ShortcutListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "shortcut-reset-current-tab-to-default-url";
  description = "Reset current tab to default URL";
  key = {
    default: "Alt+Shift+R",
    mac: "Option+Shift+R",
  };
  command = async () => {
    await this.defaultUrlUseCases.resetCurrentTabToDefaultUrl();
  };
}
