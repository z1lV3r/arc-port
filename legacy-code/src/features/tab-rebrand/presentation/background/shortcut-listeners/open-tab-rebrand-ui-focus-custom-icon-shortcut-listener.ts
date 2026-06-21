
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { OpenPopUpUseCases } from "@/features/tab-rebrand/use-cases/open-pop-up-use-cases";

export class OpenTabRebrandUiFocusCustomIconShortcutListener implements ShortcutListener {

  private readonly openPopUpUseCases: OpenPopUpUseCases;
  constructor(openPopUpUseCases: OpenPopUpUseCases) {
    this.openPopUpUseCases = openPopUpUseCases;
  }

  name = "shortcut-open-tab-rebrand-ui-focus-custom-icon";
  description = "Focus custom icon in tab rebrand UI";
  key = {
    default: "Alt+Shift+I",
    mac: "Option+Shift+I",
  }
  command = async () => {
    await this.openPopUpUseCases.openPopupFocusCustomIcon();
  };
}
