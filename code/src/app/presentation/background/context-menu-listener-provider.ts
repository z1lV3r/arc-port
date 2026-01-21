import type { BrowserService } from "@/app/domain/interfaces/browser-service";
import { DefaultUrlContextMenuListenerProvider } from "@/features/default-url/presentation/background/context-menu-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import { AppListenerProvider } from "./app-listener-provider";

export class ContextMenuListenerProvider extends AppListenerProvider {
  constructor(
    browserService: BrowserService = new DependencyProvider().getBrowserService(),
  ) {
    super(browserService);
  }

  registerContextMenuListeners() {
    const { featureName: featureName, contextMenuListeners: defaultUrlContextMenus } =
      new DefaultUrlContextMenuListenerProvider().getContextMenuListeners();
    this.browserService.registerContextMenuListeners(
      featureName,
      defaultUrlContextMenus,
    );
  }
}
