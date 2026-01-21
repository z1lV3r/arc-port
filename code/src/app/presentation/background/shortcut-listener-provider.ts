import type { ShortcutListener } from "@/app/domain/models/shortcut-listener";
import { DefaultUrlShortcutListenerProvider } from "@/features/default-url/presentation/background/shortcut-listener-provider";
import { AppListenerProvider } from "./app-listener-provider";
import type { BrowserService } from "@/app/domain/interfaces/browser-service";
import { DependencyProvider } from "@/app/dependency-provider";

export class ShortcutListenerProvider extends AppListenerProvider {
  constructor(
    browserService: BrowserService = new DependencyProvider().getBrowserService(),
  ) {
    super(browserService);
  }

  registerShortcutListeners() {
    const shortcutListeners = new Map<string, ShortcutListener>();
    this.storeListeners(
      new DefaultUrlShortcutListenerProvider().getShortcutListeners(),
      shortcutListeners,
    );
    this.browserService.registerShortcutListeners(shortcutListeners);
  }
}
