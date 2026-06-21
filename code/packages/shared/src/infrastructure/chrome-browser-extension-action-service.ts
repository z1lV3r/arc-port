import type { BrowserExtensionActionService } from "../domain/interfaces/browser-extension-action-service";
import type { ActionListener } from "../domain/models/action-listener";

export class ChromeBrowserExtensionActionService
  implements BrowserExtensionActionService
{

  setExtensionAction(action: ActionListener): void {
    chrome.action.setPopup({ popup: action.popupPath });
    chrome.action.onClicked.addListener(() => action.command());
  }

  removeExtensionAction(action: ActionListener): void {
    chrome.action.onClicked.removeListener(() => action.command());
  }

  setIcon(iconPath: string): void {
    chrome.action.setIcon({ path: iconPath });
  }

  async openPopup(): Promise<void> {
    await chrome.action.openPopup();
  }
}
