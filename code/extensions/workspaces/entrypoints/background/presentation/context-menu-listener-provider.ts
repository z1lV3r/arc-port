import { ContextMenuListenersDependencyProvider as AppDependencyProvider } from "@/app/dependency-provider/presentation/context-menu-listeners-dependency-provider";

import { DependencyProvider } from "../dependency-provider";
import { ContextMenuListenerUseCases } from "../use-cases/context-menu-listener-use-cases";

export class ContextMenuListenerProvider {
  private contextMenuListenerUseCase: ContextMenuListenerUseCases;

  constructor(
    contextMenuListenerUseCase: ContextMenuListenerUseCases = DependencyProvider.getContextMenuListenerUseCase(),
  ) {
    this.contextMenuListenerUseCase = contextMenuListenerUseCase;
  }

  registerFeaturesContextMenuListeners() {
    this.contextMenuListenerUseCase.registerContextMenuListeners([
      AppDependencyProvider.getContextMenuListeners(),
    ]);
  }
}
