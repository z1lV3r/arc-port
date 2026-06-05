import type { BrowserMessageEventService } from "../domain/interfaces/browser-message-event-service";
import type { Listener } from "@repo/shared/domain/models/listener";
import { DependencyProvider } from "../dependency-provider";
import { ListenersStore } from "../domain/models/listeners-store";

export class MessageEventListenerUseCases {
    private browserMessageService: BrowserMessageEventService
    constructor(
        browserMessageService: BrowserMessageEventService = DependencyProvider.getBrowserMessageEventService(),
    ) {
        this.browserMessageService = browserMessageService;
    }
    registerMessageEventListeners(listeners: Listener[][]) {
        const listenersStore = new ListenersStore();
        listenersStore.addListeners(listeners);
        this.browserMessageService.registerMessageEventListeners(listenersStore);
    }
}