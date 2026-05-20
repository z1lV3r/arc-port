import type { BrowserMessageService } from "@/shared/domain/interfaces/browser-message-service";
import type { ClearCurrentTabCustomNameMessageEventListener } from "./clear-custom-name-use-cases-listeners/clear-current-tab-custom-name-message-event-listener";

export class ClearTabCustomNameMessageEventSender {

    private browserMessageService: BrowserMessageService;
    private clearCurrentTabCustomNameMessageEventListener: ClearCurrentTabCustomNameMessageEventListener;

    constructor(
        browserMessageService: BrowserMessageService,
        listeners: [ClearCurrentTabCustomNameMessageEventListener],
    ) {
        this.browserMessageService = browserMessageService;
        [this.clearCurrentTabCustomNameMessageEventListener] = listeners;
    }

    async sendClearCurrentTabCustomNameEventMessage(): Promise<void> {
        await this.browserMessageService.sendEventMessage(this.clearCurrentTabCustomNameMessageEventListener.name, {});
    }
}