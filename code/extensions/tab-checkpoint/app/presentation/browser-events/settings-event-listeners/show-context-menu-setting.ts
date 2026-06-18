import type { BrowserContextMenuService } from "@repo/shared/domain/interfaces/browser-context-menu-service";
import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";
import type { SettingChangeListener } from "@repo/shared/domain/models/setting-listener";

export class ShowContextMenuSetting implements SettingChangeListener {
    private readonly browserContextMenuService: BrowserContextMenuService;
    private readonly contextMenuListeners: ContextMenuListener[];

    constructor(
        browserContextMenuService: BrowserContextMenuService,
        contextMenuListeners: ContextMenuListener[],
    ) {
        this.browserContextMenuService = browserContextMenuService;
        this.contextMenuListeners = contextMenuListeners;
    }
    name = "setting-show-context-menu";
    description = t("browser_events.on_context_menu_setting_change");
    defaultValue = true;

    command = async (oldValue: boolean, newValue: boolean) => {
        if (newValue === oldValue) return;
        if (newValue) {
            this.browserContextMenuService.createFeatureContextMenus(
                t("extension_name"),
                this.contextMenuListeners,
            );
        } else {
            this.browserContextMenuService.removeFeatureContextMenus(
                t("extension_name"),
                this.contextMenuListeners,
            );
        }
    };
}