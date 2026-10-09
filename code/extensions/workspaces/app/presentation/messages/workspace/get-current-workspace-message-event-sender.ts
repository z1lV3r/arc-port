import type { BrowserMessageService } from "@repo/shared/domain/interfaces/browser-message-service";
import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { GetCurrentWorkspaceMessageEventListener } from "./get-current-workspace-message-event-listener";

export class GetCurrentWorkspaceMessageEventSender {
  private browserMessageService: BrowserMessageService;
  private browserWindowService: BrowserWindowService;
  private getCurrentWorkspaceMessageEventListener: GetCurrentWorkspaceMessageEventListener;

  constructor(
    browserMessageService: BrowserMessageService,
    browserWindowService: BrowserWindowService,
    listeners: [GetCurrentWorkspaceMessageEventListener],
  ) {
    this.browserMessageService = browserMessageService;
    this.browserWindowService = browserWindowService;
    [this.getCurrentWorkspaceMessageEventListener] = listeners;
  }

  async sendGetCurrentWorkspaceEventMessage(): Promise<any> {
    // This sender runs in the pop-up context, so `getCurrentWindow` resolves the
    // window that owns the pop-up. The background cannot resolve it reliably
    // (in a service worker `windows.getCurrent()` falls back to the last active
    // window, and can return the most recently opened one while a pop-up is
    // visible), so the window id is resolved here and sent along.
    const currentWindow = await this.browserWindowService.getCurrentWindow();
    const response = await this.browserMessageService.sendEventMessage(
      this.getCurrentWorkspaceMessageEventListener.name,
      { windowId: currentWindow.id },
    );
    return response?.data;
  }
}
