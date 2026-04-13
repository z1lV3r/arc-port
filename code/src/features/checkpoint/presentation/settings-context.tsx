import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { BrowserShortcutSettingsService } from "@/shared/domain/interfaces/browser-shortcut-settings-service";
import { CheckpointDependencyProvider } from "../dependency-provider";
import type { SettingsUseCases } from "../use-cases/settings-use-cases";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";
import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";

interface SettingsContextType {
  tabsService: BrowserTabsService;
  shortcutSettingsService: BrowserShortcutSettingsService;
  shortcutListeners: ShortcutListener[];
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const tabsService = useMemo(
    () => CheckpointDependencyProvider.getBrowserTabsService(),
    [],
  );

  const shortcutSettingsService = useMemo(
    () => CheckpointDependencyProvider.getBrowserShortcutSettingsService(),
    [],
  );

  const shortcutListeners = useMemo(
    () => CheckpointDependencyProvider.getShortcutListeners(),
    [],
  );

  const settingsUseCases = useMemo(
    () => CheckpointDependencyProvider.getSettingsUseCases(),
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
