import { ShowContextMenuSetting } from "../../presentation/browser-events/settings-event-listeners/show-context-menu-setting.ts";
import { ExtensionActionSetting } from "../../presentation/browser-events/settings-event-listeners/extension-action-setting.ts";
import { BrowserDependencyProvider } from "../infrastructure/browser-dependency-provider.ts";
import { ContextMenuListenersDependencyProvider } from "./context-menu-listeners-dependency-provider.ts";
import { ActionListenersDependencyProvider } from "./action-listeners-dependency-provider.ts";

export class SettingsEventListenersDependencyProvider {
  private static settingChangeEventListeners: [
    ShowContextMenuSetting,
    ExtensionActionSetting,
  ];
  static getSettingChangeEventListeners(): [
    ShowContextMenuSetting,
    ExtensionActionSetting,
  ] {
    if (this.settingChangeEventListeners) {
      return this.settingChangeEventListeners;
    }

    this.settingChangeEventListeners = [
      new ShowContextMenuSetting(
        BrowserDependencyProvider.getBrowserContextMenuService(),
        ContextMenuListenersDependencyProvider.getContextMenuListeners(),
      ),
      new ExtensionActionSetting(
        BrowserDependencyProvider.getBrowserExtensionActionService(),
        ActionListenersDependencyProvider.getActionListeners(),
      ),
    ];

    return this.settingChangeEventListeners;
  }
}
