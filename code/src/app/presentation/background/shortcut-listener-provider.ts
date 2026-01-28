import { DefaultUrlShortcutListenerProvider } from "@/features/default-url/presentation/background/shortcut-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import { ShortcutListenerUseCase } from "@/app/domain/use-cases/shortcut-listener-use-case";

export class ShortcutListenerProvider {
  private shortcutListenerUseCase: ShortcutListenerUseCase;
  constructor(shortcutListenerUseCase: ShortcutListenerUseCase = new DependencyProvider().getShortcutListenerUseCase()) {
    this.shortcutListenerUseCase = shortcutListenerUseCase;
  }

  registerFeaturesShortcutListeners() {
    this.shortcutListenerUseCase.registerShortcutListeners([
      new DefaultUrlShortcutListenerProvider().getShortcutListeners(),
    ]);
  }
}
