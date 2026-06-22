import { BrowserExtensionActionService } from "@repo/shared/domain/interfaces/browser-extension-action-service";
import { ActionListener } from "@repo/shared/domain/models/action-listener";
import type { SettingChangeListener } from "@repo/shared/domain/models/setting-listener";

export const EXTENSION_ACTION_SETTING_NAME = "setting-action";
export const EXTENSION_ACTION_SETTING_DEFAULT = "on-click-show-pop-up";

export class ExtensionActionSetting implements SettingChangeListener {
  private readonly actionListeners: ActionListener[];
  private readonly browserExtensionActionService: BrowserExtensionActionService;

  constructor(
    browserExtensionActionService: BrowserExtensionActionService,
    actionListeners: ActionListener[],
  ) {
    this.browserExtensionActionService = browserExtensionActionService;
    this.actionListeners = actionListeners;
  }
  name = EXTENSION_ACTION_SETTING_NAME;
  description = t("browser_events.on_extension_action_setting_change");
  defaultValue = EXTENSION_ACTION_SETTING_DEFAULT;

  command = async (oldValue: string, newValue: string) => {
    if (newValue === oldValue) return;
    const newAction = this.actionListeners.find((l) => l.name === newValue);
    const oldAction = this.actionListeners.find((l) => l.name === oldValue);
    if (oldAction) {
      this.browserExtensionActionService.removeExtensionAction(oldAction);
    }
    if (newAction) {
      this.browserExtensionActionService.setExtensionAction(newAction);
    }
  };
}
