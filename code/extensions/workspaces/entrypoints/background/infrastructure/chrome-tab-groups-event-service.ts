import type { ListenersStore } from "@repo/shared/domain/models/listeners-store";

import type { BrowserTabGroupsEventService } from "../domain/interfaces/browser-tab-groups-event-service";

export default class ChromeTabGroupsEventService implements BrowserTabGroupsEventService {
  async registerOnTabGroupChangedEventListeners(listenersStore: ListenersStore) {
    chrome.tabGroups.onUpdated.addListener(async (tabGroup) => {
      for (const [_, tabGroupsEventListener] of listenersStore.getAllListeners()) {
        await tabGroupsEventListener.command(tabGroup.id.toString());
      }
    });
  }

  async registerOnTabGroupCreatedEventListeners(listenersStore: ListenersStore) {
    chrome.tabGroups.onCreated.addListener(async (tabGroup) => {
      for (const [_, tabGroupsEventListener] of listenersStore.getAllListeners()) {
        await tabGroupsEventListener.command(tabGroup.id.toString());
      }
    });
  }

  async registerOnTabGroupMovedEventListeners(listenersStore: ListenersStore) {
    chrome.tabGroups.onMoved.addListener(async (tabGroup) => {
      for (const [_, tabGroupsEventListener] of listenersStore.getAllListeners()) {
        await tabGroupsEventListener.command(tabGroup.id.toString());
      }
    });
  }

  async registerOnTabGroupRemovedEventListeners(listenersStore: ListenersStore) {
    chrome.tabGroups.onRemoved.addListener(async (tabGroup) => {
      for (const [_, tabGroupsEventListener] of listenersStore.getAllListeners()) {
        await tabGroupsEventListener.command(tabGroup.id.toString());
      }
    });
  }
}
