import type { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import type { ActionListener } from "@repo/shared/domain/models/action-listener";

import type { SettingsUseCases } from "./settings-use-cases";

export class ShowCheckpointUseCases {
  private readonly browserExtensionActionService: BrowserExtensionActionService;
  private readonly actionListeners: ActionListener[];
  private readonly getSettingsUseCases: () => SettingsUseCases;

  constructor(
    browserExtensionActionService: BrowserExtensionActionService,
    actionListeners: ActionListener[],
    getSettingsUseCases: () => SettingsUseCases,
  ) {
    this.browserExtensionActionService = browserExtensionActionService;
    this.actionListeners = actionListeners;
    this.getSettingsUseCases = getSettingsUseCases;
  }

  async showCurrentTabCheckpoint(): Promise<void> {
    const settingsUseCases = this.getSettingsUseCases();
    const currentActionName = await settingsUseCases.getExtensionAction();

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
