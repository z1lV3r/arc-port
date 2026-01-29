import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";

export class SetCurrentTabDefaultUrl implements ShortcutListener {
  private readonly setDefaultUrlUseCases: SetDefaultUrlUseCases;

  constructor(setDefaultUrlUseCases: SetDefaultUrlUseCases) {
    this.setDefaultUrlUseCases = setDefaultUrlUseCases;
  }
  name = "shortcut-set-current-tab-default-url";
  description = "Set current tab default URL";
  key = {
    default: "Alt+Shift+S",
    mac: "Option+Shift+S",
  };
  command = async () => {
    await this.setDefaultUrlUseCases.setCurrentTabDefaultUrl();
  };
}
