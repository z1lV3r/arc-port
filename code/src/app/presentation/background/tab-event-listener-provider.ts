import { DependencyProvider } from "@/app/dependency-provider";
import { TabEventListenerUseCases } from "@/app/use-cases/tab-event-listener-use-cases";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";

export class TabEventListenerProvider {

  private useCase: TabEventListenerUseCases;

  constructor(
    useCase: TabEventListenerUseCases = new DependencyProvider().getTabEventListenerUseCase(),
  ) {
    this.useCase = useCase;
  }

  registerFeaturesOnCloseTabEventListeners() {
    this.useCase.registerOnCloseTabEventListeners([
      DefaultUrlDependencyProvider.getOnCloseTabEventListeners(),
    ]);
  }

  registerFeaturesOnUpdateTabEventListeners() {
    this.useCase.registerOnUpdateTabEventListeners([
      DefaultUrlDependencyProvider.getOnUpdateTabEventListeners(),
    ]);
  }

  registerFeaturesOnCreateTabEventListeners() {
    this.useCase.registerOnCreateTabEventListeners([
      DefaultUrlDependencyProvider.getOnCreateTabEventListeners(),
    ]);
  }
}
