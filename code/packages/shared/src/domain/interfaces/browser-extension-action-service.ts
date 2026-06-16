import type { ActionListener } from "../models/action-listener";

export interface BrowserExtensionActionService {
  setExtensionAction(action: ActionListener): void;
  removeExtensionAction(action: ActionListener): void;
}
