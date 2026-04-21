import type { Listener } from "./listener";

export interface ShortcutListener extends Listener {
  key: {
    default: string;
    mac: string;
  };
}
