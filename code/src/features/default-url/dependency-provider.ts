import { ChromeTabsService } from "./infrastructure/chrome-tabs-service";
import { ChromeStorageDefaultUrlRepository } from "./infrastructure/chrome-storage-default-url-repository";
import { DefaultUrlUseCases } from "./domain/default-url-use-cases";
import type { TabsService } from "./domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "./domain/interfaces/default-url-repository";

export function getDependencies(): Map<string, any> {
  const dependencies = new Map<string, any>();

  const userAgent = navigator.userAgent.toLowerCase();
  const browserName = userAgent.includes("firefox") ? "firefox" : "chrome";

  if (browserName === "chrome") {
    setChromeDependencies(dependencies);
  }

  dependencies.set(
    "defaultUrlUseCases",
    new DefaultUrlUseCases(
      dependencies.get("tabsService") as TabsService,
      dependencies.get("defaultUrlRepository") as DefaultUrlRepository,
    ),
  );

  return dependencies;
}

function setChromeDependencies(dependencies: Map<string, any>) {
  dependencies.set("tabsService", new ChromeTabsService());
  dependencies.set(
    "defaultUrlRepository",
    new ChromeStorageDefaultUrlRepository(),
  );
}
