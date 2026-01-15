import {
  registerShortcutListeners,
  registerTabEventListeners,
} from "./app/presentation/background";
import { getDependencies } from "./app/dependency-provider";
import type { BrowserService } from "./app/domain/interfaces/browser-service";

const browserService = getDependencies().get(
  "browserService",
) as BrowserService;

registerShortcutListeners(browserService);
registerTabEventListeners(browserService);
