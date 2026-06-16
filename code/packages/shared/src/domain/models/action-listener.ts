import type { Listener } from "./listener";

export interface ActionListener extends Listener {
  popupPath: string;
}
