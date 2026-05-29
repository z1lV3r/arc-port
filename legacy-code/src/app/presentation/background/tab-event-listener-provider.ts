import { DependencyProvider } from "@/app/dependency-provider";
import { TabEventListenerUseCases } from "@/app/use-cases/tab-event-listener-use-cases";
import { CheckpointDependencyProvider } from "@/features/checkpoint/dependency-provider";
import { TabRebrandDependencyProvider } from "@/features/tab-rebrand/dependency-provider";

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
      TabRebrandDependencyProvider.getOnUpdateTabEventListeners(),
    ]);
  }

  registerFeaturesOnCreateTabEventListeners() {
    this.tabEventListenerUseCases.registerOnCreateTabEventListeners([
      CheckpointDependencyProvider.getOnCreateTabEventListeners(),
    ]);
  }
}
