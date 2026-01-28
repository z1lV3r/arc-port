import { DefaultUrlTabEventListenerProvider } from "@/features/default-url/presentation/background/tab-event-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import { TabEventListenerUseCase } from "@/app/domain/use-cases/tab-event-listener-use-case";

export class TabEventListenerProvider {

  private useCase: TabEventListenerUseCase;

  constructor(
    useCase: TabEventListenerUseCase = new DependencyProvider().getTabEventListenerUseCase(),
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
