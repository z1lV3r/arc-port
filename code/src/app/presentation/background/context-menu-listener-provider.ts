import { CheckpointDependencyProvider } from "@/features/checkpoint/dependency-provider";
import { ContextMenuListenerUseCases } from "@/app/use-cases/context-menu-listener-use-cases";
import { DependencyProvider } from "@/app/dependency-provider";
import { TabRebrandDependencyProvider } from "@/features/tab-rebrand/dependency-provider";

export class ContextMenuListenerProvider {
  contextMenuListenerUseCase: ContextMenuListenerUseCases;
  constructor(
    contextMenuListenerUseCase: ContextMenuListenerUseCases = DependencyProvider.getContextMenuListenerUseCase(),
  ) {
    this.contextMenuListenerUseCase = contextMenuListenerUseCase;
  }

  registerFeaturesContextMenuListeners() {
    this.contextMenuListenerUseCase.registerContextMenuListeners([
      CheckpointDependencyProvider.getContextMenuListeners(),
      TabRebrandDependencyProvider.getContextMenuListeners(),
    ]);
  }
}
