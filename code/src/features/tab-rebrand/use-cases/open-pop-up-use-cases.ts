import type { BrowserService } from "@/shared/domain/interfaces/browser-service";

export class OpenPopUpUseCases {
  private browserService: BrowserService;

  constructor(browserService: BrowserService) {
    this.browserService = browserService;
  }

  async openPopupFocusCustomName(): Promise<void> {
    await this.browserService.openPopup("custom-name");
  }

  async openPopupFocusCustomIcon(): Promise<void> {
    await this.browserService.openPopup("custom-icon");
  }
}