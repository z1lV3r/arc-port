import { TabEventListenerProvider } from "./app/presentation/background/tab-event-listener-provider";
import { ContextMenuListenerProvider } from "./app/presentation/background/context-menu-listener-provider";
import { ShortcutListenerProvider } from "./app/presentation/background/shortcut-listener-provider";

const contextMenuListenerProvider = new ContextMenuListenerProvider();
contextMenuListenerProvider.registerFeaturesContextMenuListeners();

const shortcutListenerProvider = new ShortcutListenerProvider();
shortcutListenerProvider.registerFeaturesShortcutListeners();

const tabEventListenerProvider = new TabEventListenerProvider();
tabEventListenerProvider.registerFeaturesOnCloseTabEventListeners();
tabEventListenerProvider.registerFeaturesOnUpdateTabEventListeners();
tabEventListenerProvider.registerFeaturesOnCreateTabEventListeners();