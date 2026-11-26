import { ContextMenuListenerProvider } from "./presentation/context-menu-listener-provider";
import { ExtensionListenerProvider } from "./presentation/extension-listener-provider";
import { MessageEventListenerProvider } from "./presentation/message-event-listener-provider";
import { SettingsEventListenerProvider } from "./presentation/settings-listener-provider";
import { ShortcutListenerProvider } from "./presentation/shortcut-listener-provider";
import { StorageListenerProvider } from "./presentation/storage-listener-provider";
import { TabEventListenerProvider } from "./presentation/tab-event-listener-provider";
import { TabGroupsEventListenerProvider } from "./presentation/tab-groups-event-listener-provider";
import { WindowEventListenerProvider } from "./presentation/window-event-listener-provider";

export default defineBackground(() => {
  const extensionListenerProvider = new ExtensionListenerProvider();
  extensionListenerProvider.registerFeaturesOnExtensionInstalledListeners();

  const messageEventListenerProvider = new MessageEventListenerProvider();
  messageEventListenerProvider.registerFeaturesMessageEventListeners();

  const contextMenuListenerProvider = new ContextMenuListenerProvider();
  contextMenuListenerProvider.registerFeaturesContextMenuListeners();

  const shortcutListenerProvider = new ShortcutListenerProvider();
  shortcutListenerProvider.registerFeaturesShortcutListeners();

  const tabEventListenerProvider = new TabEventListenerProvider();
  tabEventListenerProvider.registerFeaturesOnActivatedTabEventListeners();
  tabEventListenerProvider.registerFeaturesOnCloseTabEventListeners();
  tabEventListenerProvider.registerFeaturesOnUpdateTabEventListeners();
  tabEventListenerProvider.registerFeaturesOnCreateTabEventListeners();

  const tabGroupsEventListenerProvider = new TabGroupsEventListenerProvider();
  tabGroupsEventListenerProvider.registerFeaturesOnTabGroupChangedEventListeners();
  tabGroupsEventListenerProvider.registerFeaturesOnTabGroupCreatedEventListeners();
  tabGroupsEventListenerProvider.registerFeaturesOnTabGroupMovedEventListeners();
  tabGroupsEventListenerProvider.registerFeaturesOnTabGroupRemovedEventListeners();

  const windowEventListenerProvider = new WindowEventListenerProvider();
  windowEventListenerProvider.registerFeaturesOnFocusedWindowEventListeners();
  windowEventListenerProvider.registerFeaturesOnCreatedWindowEventListeners();
  windowEventListenerProvider.registerFeaturesOnRemovedWindowEventListeners();

  const settingsEventListenerProvider = new SettingsEventListenerProvider();
  settingsEventListenerProvider.registerFeaturesSettingsEventListeners();

  const storageListenerProvider = new StorageListenerProvider();
  storageListenerProvider.registerFeaturesStorageListeners();
});
