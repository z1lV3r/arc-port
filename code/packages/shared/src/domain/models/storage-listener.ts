import type { Listener } from "./listener";

export interface StorageListener extends Listener {
  applicableKeys: string;
}
