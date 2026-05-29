import { DependencyProvider } from "@/app/dependency-provider";
import { ShortcutListenerUseCases } from "@/app/use-cases/shortcut-listener-use-cases";
import { CheckpointDependencyProvider } from "@/features/checkpoint/dependency-provider";
import { TabRebrandDependencyProvider } from "@/features/tab-rebrand/dependency-provider";

export class ShortcutListenerProvider {
  private shortcutListenerUseCase: ShortcutListenerUseCases;
  constructor(shortcutListenerUseCase: ShortcutListenerUseCases = DependencyProvider.getShortcutListenerUseCase()) {
    this.shortcutListenerUseCase = shortcutListenerUseCase;
  }

  registerFeaturesShortcutListeners() {
    this.shortcutListenerUseCase.registerShortcutListeners([
      CheckpointDependencyProvider.getShortcutListeners(),
      TabRebrandDependencyProvider.getShortcutListeners(),
    ]);
  }
}
