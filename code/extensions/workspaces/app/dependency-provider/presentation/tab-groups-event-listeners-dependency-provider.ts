import { OnTabGroupRemovedUnloadWorkspaceTabGroup } from "@/app/presentation/browser-events/tab-group-event-listeners/on-tab-group-removed-unload-workspace-tab-group";
import type { TabGroupEventListener } from "@repo/shared/domain/models/tab-group-event-listener";
import { UseCasesDependencyProvider } from "../use-cases-dependency-provider";

export class TabGroupsEventListenersDependencyProvider {
  private static onTabGroupChangedEventListeners: TabGroupEventListener[];
  static getOnTabGroupChangedEventListeners(): TabGroupEventListener[] {
    if (this.onTabGroupChangedEventListeners) {
      return this.onTabGroupChangedEventListeners;
    }

    this.onTabGroupChangedEventListeners = [];

    return this.onTabGroupChangedEventListeners;
  }

  private static onTabGroupCreatedEventListeners: TabGroupEventListener[];
  static getOnTabGroupCreatedEventListeners(): TabGroupEventListener[] {
    if (this.onTabGroupCreatedEventListeners) {
      return this.onTabGroupCreatedEventListeners;
    }

    this.onTabGroupCreatedEventListeners = [];

    return this.onTabGroupCreatedEventListeners;
  }

  private static onTabGroupMovedEventListeners: TabGroupEventListener[];
  static getOnTabGroupMovedEventListeners(): TabGroupEventListener[] {
    if (this.onTabGroupMovedEventListeners) {
      return this.onTabGroupMovedEventListeners;
    }

    this.onTabGroupMovedEventListeners = [];

    return this.onTabGroupMovedEventListeners;
  }

  private static onTabGroupRemovedEventListeners: TabGroupEventListener[];
  static getOnTabGroupRemovedEventListeners(): TabGroupEventListener[] {
    if (this.onTabGroupRemovedEventListeners) {
      return this.onTabGroupRemovedEventListeners;
    }

    this.onTabGroupRemovedEventListeners = [
      new OnTabGroupRemovedUnloadWorkspaceTabGroup(
        UseCasesDependencyProvider.getLoadWorkspaceTabGroupUseCases())
    ];

    return this.onTabGroupRemovedEventListeners;
  }
}
