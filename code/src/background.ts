import {
  registerShortcutListeners,
  registerOnCloseTabEventListeners,
  registerOnUpdateTabEventListeners,
  registerOnCreateTabEventListeners,
  registerContextMenuListeners,
} from "./app/presentation/background";
import { getDependencies } from "./app/dependency-provider";
import type { BrowserService } from "./app/domain/interfaces/browser-service";

const browserService = getDependencies().get(
  "browserService",
) as BrowserService;

registerShortcutListeners(browserService);
registerOnCloseTabEventListeners(browserService);
registerOnUpdateTabEventListeners(browserService);
registerOnCreateTabEventListeners(browserService);
registerContextMenuListeners(browserService);