import { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import type { StorageListener } from "@repo/shared/domain/models/storage-listener";

export class OnCheckpointChanged implements StorageListener {
    private readonly browserExtensionActionService: BrowserExtensionActionService;

    applicableKeys = ".*-checkpoint";
    name = "on-checkpoint-changed";
    description = t("browser_events.on_checkpoint_changed");

    private readonly bwIconPath: string = "icon/bw/128.png"
    private readonly colorIconPath: string = "icon/128.png"

    constructor(browserExtensionActionService: BrowserExtensionActionService) {
        this.browserExtensionActionService = browserExtensionActionService;
    }

    command = async (oldValue: string, newValue: string) => {
        console.log("on-checkpoint-changed", oldValue, newValue);
        if (newValue === oldValue) return;
        if (newValue) {
            this.browserExtensionActionService.setIcon(this.colorIconPath);
        } else {
            this.browserExtensionActionService.setIcon(this.bwIconPath);
        }
    };
}