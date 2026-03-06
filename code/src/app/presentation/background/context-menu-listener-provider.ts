import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import { ContextMenuListenerUseCases } from "@/app/use-cases/context-menu-listener-use-cases";
import { DependencyProvider } from "@/app/dependency-provider";

export class ContextMenuListenerProvider {
  contextMenuListenerUseCase: ContextMenuListenerUseCases;
  constructor(
    contextMenuListenerUseCase: ContextMenuListenerUseCases = DependencyProvider.getContextMenuListenerUseCase(),
  ) {
    this.contextMenuListenerUseCase = contextMenuListenerUseCase;
  }

  registerFeaturesContextMenuListeners() {
    this.contextMenuListenerUseCase.registerContextMenuListeners([
      DefaultUrlDependencyProvider.getContextMenuListeners(),
    ]);
  }
}
