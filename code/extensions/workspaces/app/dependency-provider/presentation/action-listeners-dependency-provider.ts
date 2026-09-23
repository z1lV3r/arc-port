import { ActionListener } from "@repo/shared/domain/models/action-listener";
import { OnClickShowPopUp } from "../../presentation/browser-events/action-event-listeners/on-click-show-pop-up.ts";

export class ActionListenersDependencyProvider {
  private static actionListeners: ActionListener[];
  static getActionListeners(): ActionListener[] {
    if (this.actionListeners) {
      return this.actionListeners;
    }

    this.actionListeners = [
      new OnClickShowPopUp(),
    ];

    return this.actionListeners;
  }
}
