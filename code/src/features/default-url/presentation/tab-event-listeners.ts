import { getDependencies } from "../dependency-provider";
import type { TabEventListener } from "@/app/domain/tab-event-listener";
import { OnCloseRemoveDefaultUrl } from "./tab-event-listeners/on-close-delete-default-url";
import type { DefaultUrlUseCases } from "../domain/default-url-use-cases";

export function getDefaultUrlBrowserTabEventListeners() {
  const dependencies = getDependencies();
  const useCases = dependencies.get("defaultUrlUseCases") as DefaultUrlUseCases;

  const tabEventListeners = new Map<string, TabEventListener>();

  const onCloseRemoveDefaultUrl = new OnCloseRemoveDefaultUrl(useCases);
  tabEventListeners.set(onCloseRemoveDefaultUrl.name, onCloseRemoveDefaultUrl);

  return tabEventListeners;
}
