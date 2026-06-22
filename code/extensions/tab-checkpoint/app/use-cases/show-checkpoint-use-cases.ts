import type { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import type { ActionListener } from "@repo/shared/domain/models/action-listener";

import type { ExtensionActionSettingUseCases } from "./extension-action-setting-use-cases";

export class ShowCheckpointUseCases {
  private readonly browserExtensionActionService: BrowserExtensionActionService;
  private readonly actionListeners: ActionListener[];
  private readonly extensionActionSettingUseCases: ExtensionActionSettingUseCases;

  constructor(
    browserExtensionActionService: BrowserExtensionActionService,
    actionListeners: ActionListener[],
    extensionActionSettingUseCases: ExtensionActionSettingUseCases,
  ) {
    this.browserExtensionActionService = browserExtensionActionService;
    this.actionListeners = actionListeners;
    this.extensionActionSettingUseCases = extensionActionSettingUseCases;
  }

  async showCurrentTabCheckpoint(): Promise<void> {
    const currentActionName = await this.extensionActionSettingUseCases.getExtensionAction();

    const showPopUpAction = this.actionListeners.find((l) => l.popupPath !== "");

    const needsTemporarySwitch =
      showPopUpAction !== undefined && currentActionName !== showPopUpAction.name;

    if (needsTemporarySwitch) {
      this.browserExtensionActionService.setExtensionAction(showPopUpAction!);
    }

    await this.browserExtensionActionService.openPopup();

    if (needsTemporarySwitch) {
      const previousAction = this.actionListeners.find(
        (l) => l.name === currentActionName,
      );
      if (previousAction) {
        this.browserExtensionActionService.setExtensionAction(previousAction);
      }
    }
  }
}
