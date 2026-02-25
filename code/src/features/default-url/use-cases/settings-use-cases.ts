import type { SettingsRepository } from "@/shared/domain/interfaces/settings-repository";

export class SettingsUseCases {
    private readonly settingsRepository: SettingsRepository;
    private readonly settingsPrefix: string = "settings-default-url-";
    private readonly showPopUpKey: string = this.settingsPrefix + "show-pop-up";
    private readonly showPopUpDefaultValue: boolean = true;
    private readonly showContextMenuKey: string = this.settingsPrefix + "show-context-menu";
    private readonly showContextMenuDefaultValue: boolean = true;

    constructor(
        settingsRepository: SettingsRepository,
    ) {
        this.settingsRepository = settingsRepository;
    }

    async getShowPopUp(): Promise<boolean> {
        return this.settingsRepository.get(this.showPopUpKey, this.showPopUpDefaultValue);
    }

    async setShowPopUp(showPopUp: boolean): Promise<void> {
        this.settingsRepository.set(this.showPopUpKey, showPopUp);
    }

    async resetShowPopUp(): Promise<void> {
        this.settingsRepository.set(this.showPopUpKey, this.showPopUpDefaultValue);
    }
    async getShowContextMenu(): Promise<boolean> {
        return this.settingsRepository.get(this.showContextMenuKey, this.showContextMenuDefaultValue);
    }

    async setShowContextMenu(showContextMenu: boolean): Promise<void> {
        this.settingsRepository.set(this.showContextMenuKey, showContextMenu);
    }

    async resetShowContextMenu(): Promise<void> {
        this.settingsRepository.set(this.showContextMenuKey, this.showContextMenuDefaultValue);
    }
}