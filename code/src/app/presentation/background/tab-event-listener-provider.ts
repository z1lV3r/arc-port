import { DependencyProvider } from "@/app/dependency-provider";
import { TabEventListenerUseCases } from "@/app/use-cases/tab-event-listener-use-cases";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";

export class TabEventListenerProvider {

  private tabEventListenerUseCases: TabEventListenerUseCases;

  constructor(
    tabEventListenerUseCase: TabEventListenerUseCases = DependencyProvider.getTabEventListenerUseCase(),
  ) {
    this.tabEventListenerUseCases = tabEventListenerUseCase;
  }

  registerFeaturesOnCloseTabEventListeners() {
    this.tabEventListenerUseCases.registerOnCloseTabEventListeners([
      DefaultUrlDependencyProvider.getOnCloseTabEventListeners(),
    ]);
  }

  registerFeaturesOnUpdateTabEventListeners() {
    this.tabEventListenerUseCases.registerOnUpdateTabEventListeners([
      DefaultUrlDependencyProvider.getOnUpdateTabEventListeners(),
    ]);
  }

  registerFeaturesOnCreateTabEventListeners() {
    this.tabEventListenerUseCases.registerOnCreateTabEventListeners([
      DefaultUrlDependencyProvider.getOnCreateTabEventListeners(),
    ]);
  }
}
