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
}
