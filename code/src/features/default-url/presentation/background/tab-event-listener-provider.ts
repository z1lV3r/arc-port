import type { TabEventListener } from "@/shared/domain/models/tab-event-listener";
import { OnCloseRemoveDefaultUrl } from "./tab-event-listeners/on-close-delete-default-url";
import { OnPinSetTabDefaultUrl } from "./tab-event-listeners/on-pin-set-tab-default-url";
import { OnSetToGroupSetTabDefaultUrl } from "./tab-event-listeners/on-set-to-group-set-tab-default-url";
import { OnCreatePinnedSetTabDefaultUrl } from "./tab-event-listeners/on-create-pinned-set-tab-default-url";
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
      new OnPinSetTabDefaultUrl(this.setDefaultUrlUseCases),
      new OnSetToGroupSetTabDefaultUrl(this.setDefaultUrlUseCases),
    ];
  }

  getOnCreateTabEventListeners() {
    return [new OnCreatePinnedSetTabDefaultUrl(this.setDefaultUrlUseCases)];
  }
}
