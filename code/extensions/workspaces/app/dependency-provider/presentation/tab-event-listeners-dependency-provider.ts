import type { TabEventListener } from "@repo/shared/domain/models/tab-event-listener";

export class TabEventListenersDependencyProvider {
  private static onTabActivatedEventListeners: TabEventListener[];
  static getOnTabActivatedEventListeners(): TabEventListener[] {
    if (this.onTabActivatedEventListeners) {
      return this.onTabActivatedEventListeners;
    }

    this.onTabActivatedEventListeners = [
    ];

    return this.onTabActivatedEventListeners;
  }

  private static onCloseTabEventListeners: TabEventListener[];
  static getOnCloseTabEventListeners(): TabEventListener[] {
    if (this.onCloseTabEventListeners) {
      return this.onCloseTabEventListeners;
    }

    this.onCloseTabEventListeners = [
    ];

    return this.onCloseTabEventListeners;
  }

  private static onUpdateTabEventListeners: TabEventListener[];
  static getOnUpdateTabEventListeners(): TabEventListener[] {
    if (this.onUpdateTabEventListeners) {
      return this.onUpdateTabEventListeners;
    }

    this.onUpdateTabEventListeners = [
    ];

    return this.onUpdateTabEventListeners;
  }

  private static onCreateTabEventListeners: TabEventListener[];
  static getOnCreateTabEventListeners(): TabEventListener[] {
    if (this.onCreateTabEventListeners) {
      return this.onCreateTabEventListeners;
    }

    this.onCreateTabEventListeners = [
    ];

    return this.onCreateTabEventListeners;
  }
}
