import { DefaultUrlContextMenuListenerProvider } from "@/features/default-url/presentation/background/context-menu-listener-provider";
import { ContextMenuListenerUseCase } from "@/app/domain/use-cases/context-menu-listener-use-case";
import { DependencyProvider } from "@/app/dependency-provider";

export class ContextMenuListenerProvider {
  contextMenuListenerUseCase: ContextMenuListenerUseCase;
  constructor(
    contextMenuListenerUseCase: ContextMenuListenerUseCase = new DependencyProvider().getContextMenuListenerUseCase(),
  ) {
    this.contextMenuListenerUseCase = contextMenuListenerUseCase;
  }

  registerFeaturesContextMenuListeners() {
    this.contextMenuListenerUseCase.registerContextMenuListeners([
      new DefaultUrlContextMenuListenerProvider().getContextMenuListeners(),
    ]);
  }
}
