import { MessageEventListenerProvider } from "./presentation/message-event-listener-provider";
import { ShortcutListenerProvider } from "./presentation/shortcut-listener-provider";
import { ContextMenuListenerProvider } from "./presentation/context-menu-listener-provider";
import { TabEventListenerProvider } from "./presentation/tab-event-listener-provider";
import { ExtensionListenerProvider } from "./presentation/extension-listener-provider";

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
  tabEventListenerProvider.registerFeaturesOnCloseTabEventListeners();
  tabEventListenerProvider.registerFeaturesOnUpdateTabEventListeners();
  tabEventListenerProvider.registerFeaturesOnCreateTabEventListeners();
});
