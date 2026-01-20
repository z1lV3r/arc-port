import { getDependencies } from "../dependency-provider";
import type { TabEventListener } from "@/app/domain/models/tab-event-listener";
import { OnCloseRemoveDefaultUrl } from "./tab-event-listeners/on-close-delete-default-url";
import type { DefaultUrlUseCases } from "../domain/default-url-use-cases";
import { OnPinSetTabDefaultUrl } from "./tab-event-listeners/on-pin-set-tab-default-url";
import { OnSetToGroupSetTabDefaultUrl } from "./tab-event-listeners/on-set-to-group-set-tab-default-url";
import { OnCreatePinnedSetTabDefaultUrl } from "./tab-event-listeners/on-create-pinned-set-tab-default-url";

export function getOnCloseTabEventListeners() {
  const dependencies = getDependencies();
  const useCases = dependencies.get("defaultUrlUseCases") as DefaultUrlUseCases;

  const tabEventListeners = new Map<string, TabEventListener>();

  const onCloseRemoveDefaultUrl = new OnCloseRemoveDefaultUrl(useCases);
  tabEventListeners.set(onCloseRemoveDefaultUrl.name, onCloseRemoveDefaultUrl);

  return tabEventListeners;
}

export function getOnUpdateTabEventListeners() {
  const dependencies = getDependencies();
  const useCases = dependencies.get("defaultUrlUseCases") as DefaultUrlUseCases;

  const tabUpdateEventListeners = new Map<string, TabEventListener>();

  const onPinSetTabDefaultUrl = new OnPinSetTabDefaultUrl(useCases);
  tabUpdateEventListeners.set(onPinSetTabDefaultUrl.name, onPinSetTabDefaultUrl);

  const onSetToGroupSetTabDefaultUrl = new OnSetToGroupSetTabDefaultUrl(useCases);
  tabUpdateEventListeners.set(onSetToGroupSetTabDefaultUrl.name, onSetToGroupSetTabDefaultUrl);

  return tabUpdateEventListeners;
}

export function getOnCreateTabEventListeners() {
  const dependencies = getDependencies();
  const useCases = dependencies.get("defaultUrlUseCases") as DefaultUrlUseCases;

  const tabUpdateEventListeners = new Map<string, TabEventListener>();

  const onCreatePinnedSetTabDefaultUrl = new OnCreatePinnedSetTabDefaultUrl(useCases);
  tabUpdateEventListeners.set(onCreatePinnedSetTabDefaultUrl.name, onCreatePinnedSetTabDefaultUrl);

  return tabUpdateEventListeners;
}