import { WindowEventListenersDependencyProvider as AppDependencyProvider } from "@/app/dependency-provider/presentation/window-event-listeners-dependency-provider";

import { DependencyProvider } from "../dependency-provider";
import { WindowEventListenerUseCases } from "../use-cases/window-event-listener-use-cases";

export class WindowEventListenerProvider {
  private windowEventListenerUseCases: WindowEventListenerUseCases;

  constructor(
    windowEventListenerUseCases: WindowEventListenerUseCases = DependencyProvider.getWindowEventListenerUseCase(),
  ) {
    this.windowEventListenerUseCases = windowEventListenerUseCases;
  }

  registerFeaturesOnFocusedWindowEventListeners() {
    this.windowEventListenerUseCases.registerOnFocusedWindowEventListeners([
      AppDependencyProvider.getOnFocusedWindowEventListeners(),
    ]);
  }

  registerFeaturesOnCreatedWindowEventListeners() {
    this.windowEventListenerUseCases.registerOnCreatedWindowEventListeners([
      AppDependencyProvider.getOnCreatedWindowEventListeners(),
    ]);
  }

  registerFeaturesOnRemovedWindowEventListeners() {
    this.windowEventListenerUseCases.registerOnRemovedWindowEventListeners([
      AppDependencyProvider.getOnRemovedWindowEventListeners(),
    ]);
  }

}
