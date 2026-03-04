import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { ResetTabToDefaultUrlUseCases } from "@/features/default-url/use-cases/reset-tab-to-default-url-use-cases";

export class ResetOrCloseCurrentTabToDefaultUrlShortcutListener implements ShortcutListener {
  private readonly resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;

  constructor(resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases) {
    this.resetTabToDefaultUrlUseCases = resetTabToDefaultUrlUseCases;
  }
  name = "shortcut-reset-or-close-current-tab-to-default-url";
  description = "Reset or close current tab to default URL";
  key = {
    default: "Alt+Shift+D",
    mac: "Option+Shift+D",
  };
  command = async () => {
    await this.resetTabToDefaultUrlUseCases.resetOrCloseCurrentTabToDefaultUrl();
  };
}
