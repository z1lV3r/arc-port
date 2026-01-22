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
    this.listenersStore.addListeners([
      new DefaultUrlShortcutListenerProvider().getShortcutListeners(),
    ]);
    this.browserService.registerShortcutListeners(this.listenersStore);
  }
}
