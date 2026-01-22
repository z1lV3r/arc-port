import type { BrowserService } from "@/app/domain/interfaces/browser-service";
import { DefaultUrlTabEventListenerProvider } from "@/features/default-url/presentation/background/tab-event-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import { AppListenerProvider } from "./app-listener-provider";

export class TabEventListenerProvider extends AppListenerProvider {
  constructor(
    browserService: BrowserService = new DependencyProvider().getBrowserService(),
  ) {
    super(browserService);
  }

  registerOnCloseTabEventListeners() {
    this.listenersStore.addListeners([
      new DefaultUrlTabEventListenerProvider().getOnCloseTabEventListeners(),
    ]);
    this.browserService.registerOnCloseTabEventListeners(
      this.listenersStore,
    );
  }

  registerOnUpdateTabEventListeners() {
    this.listenersStore.addListeners([
      new DefaultUrlTabEventListenerProvider().getOnUpdateTabEventListeners(),
    ]);
    this.browserService.registerOnUpdateTabEventListeners(
      this.listenersStore,
    );
  }

  registerOnCreateTabEventListeners() {
    this.listenersStore.addListeners([
      new DefaultUrlTabEventListenerProvider().getOnCreateTabEventListeners(),
    ]);
    this.browserService.registerOnCreateTabEventListeners(
      this.listenersStore,
    );
  }
}
