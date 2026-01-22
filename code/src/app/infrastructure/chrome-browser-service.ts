import type { BrowserService } from "../domain/interfaces/browser-service";
import type { ContextMenuListener } from "../domain/models/context-menu-listener";
import type { ListenersStore } from "../domain/models/listeners-store";
import type { TabEventListener } from "../domain/models/tab-event-listener";

export default class ChromeBrowserService implements BrowserService {
  async registerShortcutListeners(listenersStore: ListenersStore) {
    chrome.commands.onCommand.addListener(async (listenerName) => {
      const listener = listenersStore.getListener(listenerName);
      if (listener) {
        await listener.command();

        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        showToast(tab, listener.description);
      }
    });
  }

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
      if (name.startsWith("on-pin")) {
        onPinEventListeners.push(tabEventListener);
      }
      if (name.startsWith("on-set-to-group")) {
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
      if (name.startsWith("on-create-pinned")) {
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

  async registerContextMenuListeners(
    listenersStore: ListenersStore,
  ) {
    chrome.runtime.onInstalled.addListener(async () => {
      const features : string[] = [];

      // for all the features in listenersStore
      for (const [listenerName, listener] of listenersStore.getAllListeners() as unknown as [string, ContextMenuListener][]) {
        //if the feature is not in features array, add it
        const featureName = listener.featureName;
        if (!features.includes(featureName)) {
          chrome.contextMenus.create({
            id: featureName,
            title: featureName,
            contexts: ["all"],
          });
          features.push(featureName);
        }
        chrome.contextMenus.create({
          parentId: featureName,
          id: listenerName,
          title: listener.description,
          contexts: ["all"],
        });
      }
    });

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      const listener = listenersStore.getListener(info.menuItemId.toString());
      if (listener && tab?.id) {
        await listener.command(tab.id.toString());
        showToast(tab, listener.description);
      }
    });
  }
}

function showToast(tab: chrome.tabs.Tab, command: string) {
  if (tab?.id && tab.url && !tab.url.startsWith("chrome://")) {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: createToast,
        args: [`${command} executed`],
      })
      .catch((e) => console.error("Failed to execute toast script:", e));
  }
}

function createToast(message: string) {
  // Remove existing toasts
  const existing = document.getElementById("arc-port-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "arc-port-toast";

  // Icon
  // Icon
  const iconUrl = chrome.runtime.getURL("app/assets/icon/arc-port-48.png");
  const icon = `<img src="${iconUrl}" width="20" height="20" style="margin-right:8px; display:inline-block; vertical-align:middle; border-radius: 4px;" />`;

  toast.innerHTML = `<div style="display:flex; align-items:center;">${icon}<span>${message}</span></div>`;

  // Sonner-like Styles
  toast.style.cssText = `
              position: fixed;
              top: 24px;
              right: 24px;
              background: #1e1e1e;
              color: #ededed;
              border: 1px solid #333;
              padding: 14px 20px;
              border-radius: 8px;
              z-index: 2147483647;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              font-size: 13px;
              font-weight: 500;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              display: flex;
              align-items: center;
              gap: 8px;
              opacity: 0;
              transform: translateY(16px) scale(0.95);
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              pointer-events: none;
            `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0) scale(1)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px) scale(0.95)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
