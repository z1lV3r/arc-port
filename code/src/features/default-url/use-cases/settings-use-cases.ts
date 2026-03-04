import type { SettingsRepository } from "@/shared/domain/interfaces/settings-repository";
import type { ContextMenuListener } from "@/shared/domain/models/context-menu-listener";

export class SettingsUseCases {
  private readonly settingsRepository: SettingsRepository;
  private readonly contextMenuListeners: ContextMenuListener[];
  private readonly settingsPrefix: string = "settings-default-url-";
  private readonly showPopUpKey: string = this.settingsPrefix + "show-pop-up";
  private readonly showPopUpDefaultValue: boolean = true;
  private readonly showContextMenuKey: string = this.settingsPrefix + "show-context-menu";
  private readonly showContextMenuDefaultValue: boolean = true;

  constructor(
    settingsRepository: SettingsRepository,
    contextMenuListeners: ContextMenuListener[] = [],
  ) {
    this.settingsRepository = settingsRepository;
    this.contextMenuListeners = contextMenuListeners;

    this.settingsRepository.get(this.showContextMenuKey).then((showContextMenu) => {
      if (showContextMenu === undefined) {
        this.resetShowContextMenu();
      }
    });
  }

  async getShowPopUp(): Promise<boolean> {
    return this.settingsRepository.getOrDefault(this.showPopUpKey, this.showPopUpDefaultValue);
  }

  async setShowPopUp(showPopUp: boolean): Promise<void> {
    this.settingsRepository.set(this.showPopUpKey, showPopUp);
  }

  async resetShowPopUp(): Promise<void> {
    this.setShowPopUp(this.showPopUpDefaultValue);
  }

  async getShowContextMenu(): Promise<boolean> {
    return this.settingsRepository.getOrDefault(this.showContextMenuKey, this.showContextMenuDefaultValue);
  }

  async setShowContextMenu(showContextMenu: boolean): Promise<void> {
    await this.settingsRepository.set(this.showContextMenuKey, showContextMenu);
    if (showContextMenu) {
      this.createFeatureContextMenus("Default URL", this.contextMenuListeners);
    } else {
      this.removeFeatureContextMenus("Default URL", this.contextMenuListeners);
    }
  }

  async resetShowContextMenu(): Promise<void> {
    this.setShowContextMenu(this.showContextMenuDefaultValue);
  }

  private removeFeatureContextMenus(featureName: string, listeners: ContextMenuListener[]): void {
    for (const listener of listeners) {
      chrome.contextMenus.remove(listener.name);
    }
    chrome.contextMenus.remove(featureName);
  }

  private createFeatureContextMenus(featureName: string, listeners: ContextMenuListener[]): void {
    chrome.contextMenus.create({
      id: featureName,
      title: featureName,
      contexts: ["all"],
    });
    for (const listener of listeners) {
      chrome.contextMenus.create({
        parentId: featureName,
        id: listener.name,
        title: listener.description,
        contexts: ["all"],
      });
    }
  }
}