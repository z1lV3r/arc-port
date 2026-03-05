import type { BrowserTabEventService } from "../domain/interfaces/browser-tab-event-service";
import type { ListenersStore } from "../domain/models/listeners-store";
import type { TabEventListener } from "../../shared/domain/models/tab-event-listener";

export default class ChromeTabEventService implements BrowserTabEventService {

  async registerOnCloseTabEventListeners(
    listenersStore: ListenersStore,
  ) {
    chrome.tabs.onRemoved.addListener(async (tabId) => {
      for (const [_, tabEventListener] of listenersStore.getAllListeners()) {
        await tabEventListener.command(tabId.toString());
      }
    });
  }

  async registerOnUpdateTabEventListeners(
    listenersStore: ListenersStore,
  ) {
    const onPinEventListeners: TabEventListener[] = [];
    const onSetToGroupEventListeners: TabEventListener[] = [];
    for (const [name, tabEventListener] of listenersStore.getAllListeners()) {
      if (name.startsWith("on-tab-pin")) {
        onPinEventListeners.push(tabEventListener);
      }
      if (name.startsWith("on-tab-set-to-group")) {
        onSetToGroupEventListeners.push(tabEventListener);
      }
    }
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, _) => {
      if (changeInfo.pinned && changeInfo.pinned === true) {
        for (const tabEventListener of onPinEventListeners) {
          await tabEventListener.command(tabId.toString());
        }
      }
      if (changeInfo.groupId && changeInfo.groupId !== -1) {
        for (const tabEventListener of onSetToGroupEventListeners) {
          await tabEventListener.command(tabId.toString());
        }
      }
    });
  }

  async registerOnCreateTabEventListeners(
    listenersStore: ListenersStore,
  ) {
    const onCreatePinnedTabEventListeners: TabEventListener[] = [];
    for (const [name, tabEventListener] of listenersStore.getAllListeners()) {
      if (name.startsWith("on-tab-create-pinned")) {
        onCreatePinnedTabEventListeners.push(tabEventListener);
      }
    }
    chrome.tabs.onCreated.addListener(async (tab) => {
      if (tab.pinned && tab.id) {
        for (const tabEventListener of onCreatePinnedTabEventListeners) {
          await tabEventListener.command(tab.id.toString());
        }
      }
    });
  }

}