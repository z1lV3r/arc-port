import { DefaultUrlUseCases } from "./features/default-url/domain/default-url-use-cases";
import { ChromeBrowserService } from "./features/default-url/infrastructure/chrome-browser-service";
import { ChromeStorageDefaultUrlRepository } from "./features/default-url/infrastructure/chrome-storage-default-url-repository";
import { ChromeTabsService } from "./features/default-url/infrastructure/chrome-tabs-service";

const tabsService = new ChromeTabsService();
const defaultUrlRepository = new ChromeStorageDefaultUrlRepository();
const browserService = new ChromeBrowserService();

const useCases = new DefaultUrlUseCases(
  tabsService,
  defaultUrlRepository,
  browserService,
);

chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "set-current-tab-default-url":
      await useCases.setCurrentTabDefaultUrl();
      break;
    case "clear-current-tab-default-url":
      await useCases.clearCurrentTabDefaultUrl();
      break;
    case "reset-tab-to-default-url":
      await useCases.resetTabToDefaultUrl();
      break;
  }
});
