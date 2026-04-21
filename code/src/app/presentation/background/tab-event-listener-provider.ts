import { DependencyProvider } from "@/app/dependency-provider";
import { TabEventListenerUseCases } from "@/app/use-cases/tab-event-listener-use-cases";
import { CheckpointDependencyProvider } from "@/features/checkpoint/dependency-provider";

export class TabEventListenerProvider {

  private tabEventListenerUseCases: TabEventListenerUseCases;

  constructor(
    tabEventListenerUseCase: TabEventListenerUseCases = DependencyProvider.getTabEventListenerUseCase(),
  ) {
    this.tabEventListenerUseCases = tabEventListenerUseCase;
  }

  registerFeaturesOnCloseTabEventListeners() {
    this.tabEventListenerUseCases.registerOnCloseTabEventListeners([
      CheckpointDependencyProvider.getOnCloseTabEventListeners(),
    ]);
  }

  registerFeaturesOnUpdateTabEventListeners() {
    this.tabEventListenerUseCases.registerOnUpdateTabEventListeners([
      CheckpointDependencyProvider.getOnUpdateTabEventListeners(),
    ]);
  }

  registerFeaturesOnCreateTabEventListeners() {
    this.tabEventListenerUseCases.registerOnCreateTabEventListeners([
      CheckpointDependencyProvider.getOnCreateTabEventListeners(),
    ]);
  }
}
