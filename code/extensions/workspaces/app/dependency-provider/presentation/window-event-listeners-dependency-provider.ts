import type { WindowEventListener } from "@repo/shared/domain/models/window-event-listener";

export class WindowEventListenersDependencyProvider {
  private static onFocusedWindowEventListeners: WindowEventListener[];
  static getOnFocusedWindowEventListeners(): WindowEventListener[] {
    if (this.onFocusedWindowEventListeners) {
      return this.onFocusedWindowEventListeners;
    }

    this.onFocusedWindowEventListeners = [];

    return this.onFocusedWindowEventListeners;
  }

  private static onCreatedWindowEventListeners: WindowEventListener[];
  static getOnCreatedWindowEventListeners(): WindowEventListener[] {
    if (this.onCreatedWindowEventListeners) {
      return this.onCreatedWindowEventListeners;
    }

    this.onCreatedWindowEventListeners = [];

    return this.onCreatedWindowEventListeners;
  }

  private static onRemovedWindowEventListeners: WindowEventListener[];
  static getOnRemovedWindowEventListeners(): WindowEventListener[] {
    if (this.onRemovedWindowEventListeners) {
      return this.onRemovedWindowEventListeners;
    }

    this.onRemovedWindowEventListeners = [];

    return this.onRemovedWindowEventListeners;
  }

}
