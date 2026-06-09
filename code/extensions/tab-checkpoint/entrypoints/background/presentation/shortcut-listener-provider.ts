import { DependencyProvider as AppDependencyProvider } from "@/app/dependency-provider";
import { DependencyProvider } from "../dependency-provider";
import { ShortcutListenerUseCases } from "../use-cases/shortcut-listener-use-cases";

export class ShortcutListenerProvider {
  private shortcutListenerUseCase: ShortcutListenerUseCases;

  constructor(
    shortcutListenerUseCase: ShortcutListenerUseCases = DependencyProvider.getShortcutListenerUseCase(),
  ) {
    this.shortcutListenerUseCase = shortcutListenerUseCase;
  }

  registerFeaturesShortcutListeners() {
    this.shortcutListenerUseCase.registerShortcutListeners([
      AppDependencyProvider.getShortcutListeners(),
    ]);
  }
}
