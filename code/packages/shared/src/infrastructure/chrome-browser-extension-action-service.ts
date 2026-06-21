import type { BrowserExtensionActionService } from "../domain/interfaces/browser-extension-action-service";
import type { ActionListener } from "../domain/models/action-listener";

export class ChromeBrowserExtensionActionService
  implements BrowserExtensionActionService
{

  private currentListener?: () => void;

  setExtensionAction(action: ActionListener): void {
    chrome.action.setPopup({ popup: action.popupPath });
    
    if (this.currentListener) {
      chrome.action.onClicked.removeListener(this.currentListener);
    }
    
    this.currentListener = () => action.command();
    chrome.action.onClicked.addListener(this.currentListener);
  }

  removeExtensionAction(action: ActionListener): void {
    if (this.currentListener) {
      chrome.action.onClicked.removeListener(this.currentListener);
      this.currentListener = undefined;
    }
  }

  setIcon(iconPath: string): void {
    chrome.action.setIcon({ path: iconPath });
  }

  async openPopup(): Promise<void> {
    await chrome.action.openPopup();
  }
}
