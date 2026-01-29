import { DefaultUrlShortcutListenerProvider } from "@/features/default-url/presentation/background/shortcut-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import { ShortcutListenerUseCases } from "@/app/use-cases/shortcut-listener-use-cases";

export class ShortcutListenerProvider {
  private shortcutListenerUseCase: ShortcutListenerUseCases;
  constructor(shortcutListenerUseCase: ShortcutListenerUseCases = new DependencyProvider().getShortcutListenerUseCase()) {
    this.shortcutListenerUseCase = shortcutListenerUseCase;
  }

  registerFeaturesShortcutListeners() {
    this.shortcutListenerUseCase.registerShortcutListeners([
      new DefaultUrlShortcutListenerProvider().getShortcutListeners(),
    ]);
  }
}
