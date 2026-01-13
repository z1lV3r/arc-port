import type { Shortcut } from "@/app/domain/shortcut";
import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

export class ClearCurrentTabDefaultUrl implements Shortcut {
  private readonly defaultUrlUseCases: DefaultUrlUseCases;

  constructor(defaultUrlUseCases: DefaultUrlUseCases) {
    this.defaultUrlUseCases = defaultUrlUseCases;
  }
  name = "default-url-clear-current-tab-default-url";
  description = "Clear current tab default URL";
  key = {
    default: "Alt+Shift+K",
    mac: "Option+Shift+K",
  };
  command = async () => {
    await this.defaultUrlUseCases.clearCurrentTabDefaultUrl();
  };
}
