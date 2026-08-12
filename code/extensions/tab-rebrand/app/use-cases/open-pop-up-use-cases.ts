import type { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";

export class OpenPopUpUseCases {
  private browserExtensionActionService: BrowserExtensionActionService;

  constructor(browserExtensionActionService: BrowserExtensionActionService) {
    this.browserExtensionActionService = browserExtensionActionService;
  }

  async openPopupFocusCustomName(): Promise<void> {
    await this.browserExtensionActionService.openPopup("custom-name");
  }

  async openPopupFocusCustomIcon(): Promise<void> {
    await this.browserExtensionActionService.openPopup("custom-icon");
  }
}
