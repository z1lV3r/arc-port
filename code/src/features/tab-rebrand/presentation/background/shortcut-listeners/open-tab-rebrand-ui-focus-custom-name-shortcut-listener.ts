
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { OpenPopUpUseCases } from "@/features/tab-rebrand/use-cases/open-pop-up-use-cases";

export class OpenTabRebrandUiFocusCustomNameShortcutListener implements ShortcutListener {

  private readonly openPopUpUseCases: OpenPopUpUseCases;
  constructor(openPopUpUseCases: OpenPopUpUseCases) {
    this.openPopUpUseCases = openPopUpUseCases;
  }

  name = "shortcut-open-tab-rebrand-ui-focus-custom-name";
  description = "Focus custom name in tab rebrand UI";
  key = {
    default: "Alt+Shift+E",
    mac: "Option+Shift+E",
  }
  command = async () => {
    await this.openPopUpUseCases.openPopupFocusCustomName();
  };
}
