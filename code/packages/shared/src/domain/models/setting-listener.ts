import type { Listener } from "./listener";

export interface SettingChangeListener extends Listener {
    defaultValue: any;
}