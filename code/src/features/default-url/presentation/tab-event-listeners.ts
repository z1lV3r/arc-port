import { getDependencies } from "../dependency-provider";
import type { TabEventListener } from "@/app/domain/tab-event-listener";
import { OnCloseRemoveDefaultUrl } from "./tab-event-listeners/on-close-delete-default-url";

export function getDefaultUrlBrowserTabEventListeners() {
  const dependencies = getDependencies();
  const repository = dependencies.get("defaultUrlRepository");

  const tabEventListeners = new Map<string, TabEventListener>();

  const onCloseRemoveDefaultUrl = new OnCloseRemoveDefaultUrl(
    repository,
  );
  tabEventListeners.set(
    onCloseRemoveDefaultUrl.name,
    onCloseRemoveDefaultUrl,
  );

  return tabEventListeners;
}
