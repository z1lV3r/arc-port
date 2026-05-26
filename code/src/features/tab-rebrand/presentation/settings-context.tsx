/* eslint-disable react-refresh/only-export-components */
import type { BrowserShortcutSettingsService } from "@/shared/domain/interfaces/browser-shortcut-settings-service";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { TabRebrandDependencyProvider } from "../dependency-provider";
import type { SettingsUseCases } from "../use-cases/settings-use-cases";

interface SettingsContextType {
  tabsService: BrowserTabsService;
  shortcutSettingsService: BrowserShortcutSettingsService;
  shortcutListeners: ShortcutListener[];
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const tabsService = useMemo(
    () => TabRebrandDependencyProvider.getBrowserTabsService(),
    [],
  );

  const shortcutSettingsService = useMemo(
    () => TabRebrandDependencyProvider.getBrowserShortcutSettingsService(),
    [],
  );

  const shortcutListeners = useMemo(
    () => TabRebrandDependencyProvider.getShortcutListeners(),
    [],
  );

  const settingsUseCases = useMemo(
    () => TabRebrandDependencyProvider.getSettingsUseCases(),
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
