import { TabEventListenerProvider } from "./app/presentation/background/tab-event-listener-provider";
import { ContextMenuListenerProvider } from "./app/presentation/background/context-menu-listener-provider";
import { ShortcutListenerProvider } from "./app/presentation/background/shortcut-listener-provider";

const contextMenuListenerProvider = new ContextMenuListenerProvider();
contextMenuListenerProvider.registerContextMenuListeners();

const shortcutListenerProvider = new ShortcutListenerProvider();
shortcutListenerProvider.registerShortcutListeners();

const tabEventListenerProvider = new TabEventListenerProvider();
tabEventListenerProvider.registerOnCloseTabEventListeners();
tabEventListenerProvider.registerOnUpdateTabEventListeners();
tabEventListenerProvider.registerOnCreateTabEventListeners();