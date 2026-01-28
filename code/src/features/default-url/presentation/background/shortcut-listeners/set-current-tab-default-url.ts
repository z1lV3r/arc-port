import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";

export class SetCurrentTabDefaultUrl implements ShortcutListener {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "shortcut-set-current-tab-default-url";
  description = "Set current tab default URL";
  key = {
    default: "Alt+Shift+S",
    mac: "Option+Shift+S",
  };
  command = async () => {
    await this.defaultUrlUseCases.setCurrentTabDefaultUrl();
  };
}
