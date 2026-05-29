import { TabEventListenerProvider } from "./app/presentation/background/tab-event-listener-provider";
import { ContextMenuListenerProvider } from "./app/presentation/background/context-menu-listener-provider";
import { ShortcutListenerProvider } from "./app/presentation/background/shortcut-listener-provider";
import { ExtensionListenerProvider } from "./app/presentation/background/extension-listener-provider";
import { MessageEventListenerProvider } from "./app/presentation/background/message-event-listener-provider";

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