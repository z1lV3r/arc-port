import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";

export class ClearCurrentTabDefaultUrlShortcutListener implements ShortcutListener {
  private readonly clearDefaultUrlUseCases: ClearDefaultUrlUseCases;

  constructor(clearDefaultUrlUseCases: ClearDefaultUrlUseCases) {
    this.clearDefaultUrlUseCases = clearDefaultUrlUseCases;
  }
  name = "shortcut-clear-current-tab-default-url";
  description = "Clear current tab default URL";
  key = {
    default: "Alt+Shift+K",
    mac: "Option+Shift+K",
  };
  command = async () => {
    await this.clearDefaultUrlUseCases.clearCurrentTabDefaultUrl();
  };
}
