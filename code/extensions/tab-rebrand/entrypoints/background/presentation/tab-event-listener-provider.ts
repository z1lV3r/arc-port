import { DependencyProvider as AppDependencyProvider } from "@/app/dependency-provider";

import { DependencyProvider } from "../dependency-provider";
import { TabEventListenerUseCases } from "../use-cases/tab-event-listener-use-cases";

export class TabEventListenerProvider {
  private tabEventListenerUseCases: TabEventListenerUseCases;

  constructor(
    tabEventListenerUseCase: TabEventListenerUseCases = DependencyProvider.getTabEventListenerUseCase(),
  ) {
    this.tabEventListenerUseCases = tabEventListenerUseCase;
  }

  registerFeaturesOnCloseTabEventListeners() {
    this.tabEventListenerUseCases.registerOnCloseTabEventListeners([
      AppDependencyProvider.getOnCloseTabEventListeners(),
    ]);
  }

  registerFeaturesOnUpdateTabEventListeners() {
    this.tabEventListenerUseCases.registerOnUpdateTabEventListeners([
      AppDependencyProvider.getOnUpdateTabEventListeners(),
    ]);
  }

}
