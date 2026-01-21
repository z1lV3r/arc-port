import type { BrowserService } from "@/app/domain/interfaces/browser-service";
import type { TabEventListener } from "@/app/domain/models/tab-event-listener";
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
    const tabEventListeners = new Map<string, TabEventListener>();
    const defaultUrlOnCloseTabEventListeners =
      new DefaultUrlTabEventListenerProvider().getOnCloseTabEventListeners();
    this.storeListeners(defaultUrlOnCloseTabEventListeners, tabEventListeners);
    this.browserService.registerOnCloseTabEventListeners(tabEventListeners);
  }

  registerOnUpdateTabEventListeners() {
    const tabEventListeners = new Map<string, TabEventListener>();
    const defaultUrlOnUpdateTabEventListeners =
      new DefaultUrlTabEventListenerProvider().getOnUpdateTabEventListeners();
    this.storeListeners(defaultUrlOnUpdateTabEventListeners, tabEventListeners);
    this.browserService.registerOnUpdateTabEventListeners(tabEventListeners);
  }

  registerOnCreateTabEventListeners() {
    const tabEventListeners = new Map<string, TabEventListener>();
    const defaultUrlOnCreateTabEventListeners =
      new DefaultUrlTabEventListenerProvider().getOnCreateTabEventListeners();
    this.storeListeners(defaultUrlOnCreateTabEventListeners, tabEventListeners);
    this.browserService.registerOnCreateTabEventListeners(tabEventListeners);
  }
}
