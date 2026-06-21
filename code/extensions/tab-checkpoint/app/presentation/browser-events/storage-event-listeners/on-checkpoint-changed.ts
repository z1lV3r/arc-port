import { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { StorageListener } from "@repo/shared/domain/models/storage-listener";

export class OnCheckpointChanged implements StorageListener {
    private readonly browserExtensionActionService: BrowserExtensionActionService;
    private readonly browserTabsService: BrowserTabsService;

    applicableKeys = ".*-checkpoint";
    name = "on-checkpoint-changed";
    description = t("browser_events.on_checkpoint_changed");

    private readonly bwIconPath: string = "icon/bw/128.png"
    private readonly colorIconPath: string = "icon/128.png"

    constructor(
        browserExtensionActionService: BrowserExtensionActionService,
        browserTabsService: BrowserTabsService
    ) {
        this.browserExtensionActionService = browserExtensionActionService;
        this.browserTabsService = browserTabsService;
    }

    command = async (key: string, [oldValue, newValue]: [string, string]) => {
        console.log("on-checkpoint-changed", oldValue, newValue);
        console.log(key);
        if (newValue === oldValue) return;

        const currentTab = await this.browserTabsService.getCurrentTab();
        console.log("currentTab", currentTab);
        console.log(key.substring(0, key.length - "-checkpoint".length));
        console.log(currentTab?.id?.toString());
        if(key.substring(0, key.length - "-checkpoint".length) === currentTab?.id?.toString()) {
            if (newValue) {
                console.log("setting color")
                this.browserExtensionActionService.setIcon(this.colorIconPath);
            } else {
                console.log("setting bw")
                this.browserExtensionActionService.setIcon(this.bwIconPath);
            }
        }
    };
}