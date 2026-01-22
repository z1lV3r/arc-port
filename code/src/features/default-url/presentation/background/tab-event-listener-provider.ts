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

  getOnCloseTabEventListeners() : TabEventListener[] {
    return [new OnCloseRemoveDefaultUrl(this.useCases)];
  }

  getOnUpdateTabEventListeners() {
    return [
      new OnPinSetTabDefaultUrl(this.useCases),
      new OnSetToGroupSetTabDefaultUrl(this.useCases),
    ];
  }

  getOnCreateTabEventListeners() {
    return [new OnCreatePinnedSetTabDefaultUrl(this.useCases)];
  }
}
