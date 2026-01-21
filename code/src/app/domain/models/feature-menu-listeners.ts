import type { ContextMenuListener } from "./context-menu-listener";

export class FeatureContextMenuListeners {
  featureName: string;
  contextMenuListeners: Map<string, ContextMenuListener>;

  constructor(
    featureName: string,
    contextMenuListeners: Map<string, ContextMenuListener>,
  ) {
    this.featureName = featureName;
    this.contextMenuListeners = contextMenuListeners;
  }
}
