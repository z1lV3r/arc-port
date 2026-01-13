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
    default: "Ctrl+Shift+L",
    mac: "Command+Shift+L",
  };
  command = async () => {
    await this.defaultUrlUseCases.setCurrentTabDefaultUrl();
  };
}
