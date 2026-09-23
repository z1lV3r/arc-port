import type { ShortcutListener } from "@repo/shared/domain/models/shortcut-listener";

export class ShortcutListenersDependencyProvider {
  private static shortcutListeners: ShortcutListener[];
  static getShortcutListeners(): ShortcutListener[] {
    if (this.shortcutListeners) {
      return this.shortcutListeners;
    }

    this.shortcutListeners = [
    ];

    return this.shortcutListeners;
  }
}
