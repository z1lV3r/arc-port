import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import { OnCloseRemoveDefaultUrl } from "./tab-event-listeners/on-close-delete-default-url";
import { OnPinSetDefaultUrl } from "./tab-event-listeners/on-pin-set-default-url";
import { OnSetToGroupSetDefaultUrl } from "./tab-event-listeners/on-set-to-group-set-default-url";
import { OnCreatePinnedSetDefaultUrl } from "./tab-event-listeners/on-create-pinned-set-default-url";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";

export class DefaultUrlTabEventListenerProvider {

  private clearDefaultUrlUseCases: ClearDefaultUrlUseCases;
  private setDefaultUrlUseCases: SetDefaultUrlUseCases;

  constructor(
    clearDefaultUrlUseCases: ClearDefaultUrlUseCases = new DefaultUrlDependencyProvider().getClearDefaultUrlUseCases(),
    setDefaultUrlUseCases: SetDefaultUrlUseCases = new DefaultUrlDependencyProvider().getSetDefaultUrlUseCases(),
  ) {
    this.clearDefaultUrlUseCases = clearDefaultUrlUseCases;
    this.setDefaultUrlUseCases = setDefaultUrlUseCases;
  }

  getOnCloseTabEventListeners() : TabEventListener[] {
    return [new OnCloseRemoveDefaultUrl(this.clearDefaultUrlUseCases)];
  }

  getOnUpdateTabEventListeners() {
    return [
      new OnPinSetDefaultUrl(this.setDefaultUrlUseCases),
      new OnSetToGroupSetDefaultUrl(this.setDefaultUrlUseCases),
    ];
  }

  getOnCreateTabEventListeners() {
    return [new OnCreatePinnedSetDefaultUrl(this.setDefaultUrlUseCases)];
  }
}
