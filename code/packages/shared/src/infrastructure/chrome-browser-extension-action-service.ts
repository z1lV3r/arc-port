import type { BrowserExtensionActionService } from "../domain/interfaces/browser-extension-action-service";
import type { ActionListener } from "../domain/models/action-listener";

export class ChromeBrowserExtensionActionService
  implements BrowserExtensionActionService
{
  private readonly actionListeners = new Map<
    string,
    Parameters<typeof chrome.action.onClicked.addListener>[0]
  >();

  setExtensionAction(action: ActionListener): void {
    chrome.action.setPopup({ popup: action.popupPath });

    this.removeExtensionAction(action);

    const listener = () => action.command();
    this.actionListeners.set(action.name, listener);
    chrome.action.onClicked.addListener(listener);
  }

  removeExtensionAction(action: ActionListener): void {
    const listener = this.actionListeners.get(action.name);

    if (!listener) return;

    chrome.action.onClicked.removeListener(listener);
    this.actionListeners.delete(action.name);
  }

  setIcon(iconPath: string): void {
    chrome.action.setIcon({ path: iconPath });
  }

  async openPopup(): Promise<void> {
    await chrome.action.openPopup();
  }
}
