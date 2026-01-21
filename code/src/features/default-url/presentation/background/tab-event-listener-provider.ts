import type { TabEventListener } from "@/app/domain/models/tab-event-listener";
import { OnCloseRemoveDefaultUrl } from "./tab-event-listeners/on-close-delete-default-url";
import { OnPinSetTabDefaultUrl } from "./tab-event-listeners/on-pin-set-tab-default-url";
import { OnSetToGroupSetTabDefaultUrl } from "./tab-event-listeners/on-set-to-group-set-tab-default-url";
import { OnCreatePinnedSetTabDefaultUrl } from "./tab-event-listeners/on-create-pinned-set-tab-default-url";
import { DefaultUrlDependencyProvider } from "../../dependency-provider";
import type { DefaultUrlUseCases } from "../../domain/default-url-use-cases";

export class DefaultUrlTabEventListenerProvider {
  private useCases: DefaultUrlUseCases;

  constructor(
    useCases: DefaultUrlUseCases = new DefaultUrlDependencyProvider().getDefaultUrlUseCases(),
  ) {
    this.useCases = useCases;
  }

  getOnCloseTabEventListeners() {
    const tabEventListeners = new Map<string, TabEventListener>();

    const onCloseRemoveDefaultUrl = new OnCloseRemoveDefaultUrl(this.useCases);
    tabEventListeners.set(
      onCloseRemoveDefaultUrl.name,
      onCloseRemoveDefaultUrl,
    );

    return tabEventListeners;
  }

  getOnUpdateTabEventListeners() {
    const tabUpdateEventListeners = new Map<string, TabEventListener>();

    const onPinSetTabDefaultUrl = new OnPinSetTabDefaultUrl(this.useCases);
    tabUpdateEventListeners.set(
      onPinSetTabDefaultUrl.name,
      onPinSetTabDefaultUrl,
    );

    const onSetToGroupSetTabDefaultUrl = new OnSetToGroupSetTabDefaultUrl(
      this.useCases,
    );
    tabUpdateEventListeners.set(
      onSetToGroupSetTabDefaultUrl.name,
      onSetToGroupSetTabDefaultUrl,
    );

    return tabUpdateEventListeners;
  }

  getOnCreateTabEventListeners() {
    const tabUpdateEventListeners = new Map<string, TabEventListener>();

    const onCreatePinnedSetTabDefaultUrl = new OnCreatePinnedSetTabDefaultUrl(
      this.useCases,
    );
    tabUpdateEventListeners.set(
      onCreatePinnedSetTabDefaultUrl.name,
      onCreatePinnedSetTabDefaultUrl,
    );

    return tabUpdateEventListeners;
  }
}
