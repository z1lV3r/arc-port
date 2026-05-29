import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";
import type { OpenPopUpUseCases } from "@/features/tab-rebrand/use-cases/open-pop-up-use-cases";

export class OpenTabRebrandUiFocusCustomIconContextMenuListener implements ContextMenuListener {
  private readonly openPopUpUseCases: OpenPopUpUseCases;

  constructor(openPopUpUseCases: OpenPopUpUseCases) {
    this.openPopUpUseCases = openPopUpUseCases;
  }

  name = "context-menu-open-tab-rebrand-ui-focus-custom-icon";
  description = "Focus custom icon in tab rebrand UI";
  command = async () => {
    await this.openPopUpUseCases.openPopupFocusCustomIcon();
  }
}
