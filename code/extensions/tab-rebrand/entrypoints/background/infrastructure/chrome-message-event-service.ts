import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserMessageEventService } from "../domain/interfaces/browser-message-event-service";

export class ChromeMessageEventService implements BrowserMessageEventService {
  async registerMessageEventListeners(listenersStore: ListenersStore) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      const listener = listenersStore.getListener(request.listenerName);
      if (listener) {
        listener
          .command(request, sender, sendResponse)
          .then(() => sendResponse({ success: true }))
          .catch((error: unknown) =>
            sendResponse({ success: false, error: String(error) }),
          );
        return true;
      }
    });
  }
}
