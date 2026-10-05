import type { TabGroupsEventListener } from "@repo/shared/domain/models/tab-groups-event-listener";

export class TabGroupsEventListenersDependencyProvider {
  private static onTabGroupChangedEventListeners: TabGroupsEventListener[];
  static getOnTabGroupChangedEventListeners(): TabGroupsEventListener[] {
    if (this.onTabGroupChangedEventListeners) {
      return this.onTabGroupChangedEventListeners;
    }

    this.onTabGroupChangedEventListeners = [];

    return this.onTabGroupChangedEventListeners;
  }

  private static onTabGroupCreatedEventListeners: TabGroupsEventListener[];
  static getOnTabGroupCreatedEventListeners(): TabGroupsEventListener[] {
    if (this.onTabGroupCreatedEventListeners) {
      return this.onTabGroupCreatedEventListeners;
    }

    this.onTabGroupCreatedEventListeners = [];

    return this.onTabGroupCreatedEventListeners;
  }

  private static onTabGroupMovedEventListeners: TabGroupsEventListener[];
  static getOnTabGroupMovedEventListeners(): TabGroupsEventListener[] {
    if (this.onTabGroupMovedEventListeners) {
      return this.onTabGroupMovedEventListeners;
    }

    this.onTabGroupMovedEventListeners = [];

    return this.onTabGroupMovedEventListeners;
  }

  private static onTabGroupRemovedEventListeners: TabGroupsEventListener[];
  static getOnTabGroupRemovedEventListeners(): TabGroupsEventListener[] {
    if (this.onTabGroupRemovedEventListeners) {
      return this.onTabGroupRemovedEventListeners;
    }

    this.onTabGroupRemovedEventListeners = [];

    return this.onTabGroupRemovedEventListeners;
  }
}
