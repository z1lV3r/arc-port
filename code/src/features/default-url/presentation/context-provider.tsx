import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { TabsService } from "@/features/default-url/domain/interfaces/tabs-service";
import type { DefaultUrlRepository } from "@/features/default-url/domain/interfaces/default-url-repository";
import { ChromeTabsService } from "@/features/default-url/infrastructure/chrome-tabs-service";
import { ChromeStorageDefaultUrlRepository } from "@/features/default-url/infrastructure/chrome-storage-default-url-repository";
import { ChromeBrowserService } from "@/features/default-url/infrastructure/chrome-browser-service";

interface DefaultUrlContextType {
  tabsService: TabsService;
  defaultUrlRepository: DefaultUrlRepository;
  browserService: ChromeBrowserService;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const tabsService = useMemo(() => new ChromeTabsService(), []);

  const defaultUrlRepository = useMemo(
    () => new ChromeStorageDefaultUrlRepository(),
    [],
  );

  const browserService = useMemo(() => new ChromeBrowserService(), []);

  return (
    <DefaultUrlContext.Provider value={{ tabsService, defaultUrlRepository, browserService }}>
      {children}
    </DefaultUrlContext.Provider>
  );
}

const DefaultUrlContext = createContext<DefaultUrlContextType | undefined>(
  undefined,
);

export function useDefaultUrlContext() {
  const context = useContext(DefaultUrlContext);
  if (!context) {
    throw new Error(
      "useDefaultUrlContext must be used within a DefaultUrlContextProvider",
    );
  }
  return context;
}
