import { TabGroupsEventListenersDependencyProvider as AppDependencyProvider } from "@/app/dependency-provider/presentation/tab-groups-event-listeners-dependency-provider";

import { DependencyProvider } from "../dependency-provider";
import { TabGroupsEventListenerUseCases } from "../use-cases/tab-groups-event-listener-use-cases";

export class TabGroupsEventListenerProvider {
  private tabGroupsEventListenerUseCases: TabGroupsEventListenerUseCases;

  constructor(
    tabGroupsEventListenerUseCases: TabGroupsEventListenerUseCases = DependencyProvider.getTabGroupsEventListenerUseCase(),
  ) {
    this.tabGroupsEventListenerUseCases = tabGroupsEventListenerUseCases;
  }

  registerFeaturesOnTabGroupChangedEventListeners() {
    this.tabGroupsEventListenerUseCases.registerOnTabGroupChangedEventListeners([
      AppDependencyProvider.getOnTabGroupChangedEventListeners(),
    ]);
  }

  registerFeaturesOnTabGroupCreatedEventListeners() {
    this.tabGroupsEventListenerUseCases.registerOnTabGroupCreatedEventListeners([
      AppDependencyProvider.getOnTabGroupCreatedEventListeners(),
    ]);
  }

  registerFeaturesOnTabGroupMovedEventListeners() {
    this.tabGroupsEventListenerUseCases.registerOnTabGroupMovedEventListeners([
      AppDependencyProvider.getOnTabGroupMovedEventListeners(),
    ]);
  }

  registerFeaturesOnTabGroupRemovedEventListeners() {
    this.tabGroupsEventListenerUseCases.registerOnTabGroupRemovedEventListeners([
      AppDependencyProvider.getOnTabGroupRemovedEventListeners(),
    ]);
  }
}
