import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";
import type { Shortcut } from "@/app/domain/shortcut";

export class SetCurrentTabDefaultUrl implements Shortcut {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }

  name = "default-url-set-current-tab-default-url";
  description = "Set current tab default URL";
  key = {
    default: "Alt+Shift+S",
    mac: "Option+Shift+S",
  };
  command = async () => {
    await this.defaultUrlUseCases.setCurrentTabDefaultUrl();
  };
}
