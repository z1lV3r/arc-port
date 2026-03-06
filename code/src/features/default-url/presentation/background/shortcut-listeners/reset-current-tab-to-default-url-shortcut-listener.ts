import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { ResetTabToDefaultUrlUseCases } from "@/features/default-url/use-cases/reset-tab-to-default-url-use-cases";

export class ResetCurrentTabToDefaultUrlShortcutListener implements ShortcutListener {
  private readonly resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;

  constructor(resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases) {
    this.resetTabToDefaultUrlUseCases = resetTabToDefaultUrlUseCases;
  }
  name = "shortcut-reset-current-tab-to-default-url";
  description = "Reset current tab to default URL";
  key = {
    default: "Alt+Shift+R",
    mac: "Option+Shift+R",
  };
  command = async () => {
    await this.resetTabToDefaultUrlUseCases.resetCurrentTabToDefaultUrl();
  };
}
