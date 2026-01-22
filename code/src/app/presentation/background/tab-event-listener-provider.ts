import { DefaultUrlTabEventListenerProvider } from "@/features/default-url/presentation/background/tab-event-listener-provider";
import { DependencyProvider } from "@/app/dependency-provider";
import type { BrowserTabEventService } from "@/app/domain/interfaces/browser-tab-event-service";
import { ListenersStore } from "@/app/domain/models/listeners-store";

export class TabEventListenerProvider {

  private browserTabEventService: BrowserTabEventService;

  constructor(
    browserTabEventService: BrowserTabEventService = new DependencyProvider().getBrowserTabEventService(),
  ) {
    this.browserTabEventService = browserTabEventService;
  }

  registerOnCloseTabEventListeners() {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners([
      new DefaultUrlTabEventListenerProvider().getOnCloseTabEventListeners(),
    ]);
    this.browserTabEventService.registerOnCloseTabEventListeners(
      listenersStore,
    );
  }

  registerOnUpdateTabEventListeners() {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners([
      new DefaultUrlTabEventListenerProvider().getOnUpdateTabEventListeners(),
    ]);
    this.browserTabEventService.registerOnUpdateTabEventListeners(
      listenersStore,
    );
  }

  registerOnCreateTabEventListeners() {
    const listenersStore = new ListenersStore();
    listenersStore.addListeners([
      new DefaultUrlTabEventListenerProvider().getOnCreateTabEventListeners(),
    ]);
    this.browserTabEventService.registerOnCreateTabEventListeners(
      listenersStore,
    );
  }
}
