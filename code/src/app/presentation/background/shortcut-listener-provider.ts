import { DependencyProvider } from "@/app/dependency-provider";
import { ShortcutListenerUseCases } from "@/app/use-cases/shortcut-listener-use-cases";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";

export class ShortcutListenerProvider {
  private shortcutListenerUseCase: ShortcutListenerUseCases;
  constructor(shortcutListenerUseCase: ShortcutListenerUseCases = new DependencyProvider().getShortcutListenerUseCase()) {
    this.shortcutListenerUseCase = shortcutListenerUseCase;
  }

  registerFeaturesShortcutListeners() {
    this.shortcutListenerUseCase.registerShortcutListeners([
      new DefaultUrlDependencyProvider().getShortcutListeners(),
    ]);
  }
}
