import type { ContextMenuListener } from "@repo/shared/domain/models/context-menu-listener";

export class ContextMenuListenersDependencyProvider {
  private static contextMenuListeners: ContextMenuListener[];
  static getContextMenuListeners(): ContextMenuListener[] {
    if (this.contextMenuListeners) {
      return this.contextMenuListeners;
    }

    this.contextMenuListeners = [
    ];

    return this.contextMenuListeners;
  }
}
