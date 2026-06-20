import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";
import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";

import type { BrowserTabEventService } from "../domain/interfaces/browser-tab-event-service";

export default class ChromeTabEventService implements BrowserTabEventService {

  async registerOnTabActivatedEventListeners(listenersStore: ListenersStore) {
    chrome.tabs.onActivated.addListener(async (tabId) => {
      for (const [_, tabEventListener] of listenersStore.getAllListeners()) {
        await tabEventListener.command(tabId.toString());
      }
    });
  }

  async registerOnCloseTabEventListeners(listenersStore: ListenersStore) {
    chrome.tabs.onRemoved.addListener(async (tabId) => {
      for (const [_, tabEventListener] of listenersStore.getAllListeners()) {
        await tabEventListener.command(tabId.toString());
      }
    });
  }

  async registerOnUpdateTabEventListeners(listenersStore: ListenersStore) {
    const onPinEventListeners: TabEventListener[] = [];
    const onSetToGroupEventListeners: TabEventListener[] = [];
    const onTitleUpdateEventListeners: TabEventListener[] = [];
    const onIconUpdateEventListeners: TabEventListener[] = [];
    for (const [name, tabEventListener] of listenersStore.getAllListeners()) {
      if (name.startsWith("on-tab-pin")) {
        onPinEventListeners.push(tabEventListener);
      }
      if (name.startsWith("on-tab-set-to-group")) {
        onSetToGroupEventListeners.push(tabEventListener);
      }
      if (name.startsWith("on-tab-title-update")) {
        onTitleUpdateEventListeners.push(tabEventListener);
      }
      if (name.startsWith("on-tab-icon-update")) {
        onIconUpdateEventListeners.push(tabEventListener);
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
      if (changeInfo.title !== undefined) {
        for (const tabEventListener of onTitleUpdateEventListeners) {
          await tabEventListener.command(tabId.toString());
        }
      }
      if (changeInfo.favIconUrl !== undefined) {
        for (const tabEventListener of onIconUpdateEventListeners) {
          await tabEventListener.command(tabId.toString());
        }
      }
    });
  }

  async registerOnCreateTabEventListeners(listenersStore: ListenersStore) {
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
