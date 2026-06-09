import { MessageEventListenerProvider } from "./presentation/message-event-listener-provider";
import { ShortcutListenerProvider } from "./presentation/shortcut-listener-provider";

export default defineBackground(() => {
  //     const extensionListenerProvider = new ExtensionListenerProvider();
  // extensionListenerProvider.registerFeaturesOnExtensionInstalledListeners();

  const messageEventListenerProvider = new MessageEventListenerProvider();
  messageEventListenerProvider.registerFeaturesMessageEventListeners();

  // const contextMenuListenerProvider = new ContextMenuListenerProvider();
  // contextMenuListenerProvider.registerFeaturesContextMenuListeners();

  const shortcutListenerProvider = new ShortcutListenerProvider();
  shortcutListenerProvider.registerFeaturesShortcutListeners();

  // const tabEventListenerProvider = new TabEventListenerProvider();
  // tabEventListenerProvider.registerFeaturesOnCloseTabEventListeners();
  // tabEventListenerProvider.registerFeaturesOnUpdateTabEventListeners();
  // tabEventListenerProvider.registerFeaturesOnCreateTabEventListeners();
});
