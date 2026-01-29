import { DefaultUrlTabEventListenerProvider } from "@/features/default-url/presentation/background/tab-event-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import { TabEventListenerUseCases } from "@/app/use-cases/tab-event-listener-use-cases";

export class TabEventListenerProvider {

  private useCase: TabEventListenerUseCases;

  constructor(
    useCase: TabEventListenerUseCases = new DependencyProvider().getTabEventListenerUseCase(),
  ) {
    this.useCase = useCase;
  }

  registerFeaturesOnCloseTabEventListeners() {
    this.useCase.registerOnCloseTabEventListeners([
      new DefaultUrlTabEventListenerProvider().getOnCloseTabEventListeners(),
    ]);
  }

  registerFeaturesOnUpdateTabEventListeners() {
    this.useCase.registerOnUpdateTabEventListeners([
      new DefaultUrlTabEventListenerProvider().getOnUpdateTabEventListeners(),
    ]);
  }

  registerFeaturesOnCreateTabEventListeners() {
    this.useCase.registerOnCreateTabEventListeners([
      new DefaultUrlTabEventListenerProvider().getOnCreateTabEventListeners(),
    ]);
  }
}
