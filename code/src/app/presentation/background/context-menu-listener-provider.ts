import { DefaultUrlContextMenuListenerProvider } from "@/features/default-url/presentation/background/context-menu-listener-provider";
import { ContextMenuListenerUseCases } from "@/app/use-cases/context-menu-listener-use-cases";
import { DependencyProvider } from "@/app/dependency-provider";

export class ContextMenuListenerProvider {
  contextMenuListenerUseCase: ContextMenuListenerUseCases;
  constructor(
    contextMenuListenerUseCase: ContextMenuListenerUseCases = new DependencyProvider().getContextMenuListenerUseCase(),
  ) {
    this.contextMenuListenerUseCase = contextMenuListenerUseCase;
  }

  registerFeaturesContextMenuListeners() {
    this.contextMenuListenerUseCase.registerContextMenuListeners([
      new DefaultUrlContextMenuListenerProvider().getContextMenuListeners(),
    ]);
  }
}
