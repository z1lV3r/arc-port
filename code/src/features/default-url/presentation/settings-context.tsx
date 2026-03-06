import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { BrowserShortcutSettingsService } from "@/shared/domain/interfaces/browser-shortcut-settings-service";
import { DefaultUrlDependencyProvider } from "../dependency-provider";
import type { SettingsUseCases } from "../use-cases/settings-use-cases";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { TabsService } from "@/shared/domain/interfaces/tabs-service";

interface SettingsContextType {
  tabsService: TabsService;
  shortcutSettingsService: BrowserShortcutSettingsService;
  shortcutListeners: ShortcutListener[];
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const tabsService = useMemo(
    () => DefaultUrlDependencyProvider.getTabsService(),
    [],
  );

  const shortcutSettingsService = useMemo(
    () => DefaultUrlDependencyProvider.getShortcutSettingsService(),
    [],
  );

  const shortcutListeners = useMemo(
    () => DefaultUrlDependencyProvider.getShortcutListeners(),
    [],
  );

  const settingsUseCases = useMemo(
    () => DefaultUrlDependencyProvider.getSettingsUseCases(),
    [],
  );

  return (
    <SettingsContext.Provider
      value={{
        tabsService,
        shortcutSettingsService,
        shortcutListeners,
        settingsUseCases,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider",
    );
  }
  return context;
}
