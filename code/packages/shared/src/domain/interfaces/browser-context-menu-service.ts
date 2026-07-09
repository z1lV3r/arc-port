import type { ContextMenuListener } from "../models/context-menu-listener";

export interface BrowserContextMenuService {
  createFeatureContextMenus(
    featureName: string,
    listeners: ContextMenuListener[],
  ): void;
  removeFeatureContextMenus(
    featureName: string,
    listeners: ContextMenuListener[],
  ): void;
}
