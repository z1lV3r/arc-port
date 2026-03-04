import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { BrowserShortcutSettingsService } from "@/shared/domain/interfaces/browser-shortcut-settings-service";
import { DefaultUrlDependencyProvider } from "../dependency-provider";
import type { SettingsUseCases } from "../use-cases/settings-use-cases";
import type { ShortcutListener } from "@/shared/domain/models/shortcut-listener";

interface SettingsContextType {
  shortcutSettingsService: BrowserShortcutSettingsService;
  shortcutListeners: ShortcutListener[];
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const dependencies = new DefaultUrlDependencyProvider();

  const shortcutSettingsService = useMemo(
    () => dependencies.getShortcutSettingsService(),
    [],
  );

  const shortcutListeners = useMemo(
    () => dependencies.getShortcutListeners(),
    [],
  );

  const settingsUseCases = useMemo(
    () => dependencies.getSettingsUseCases(),
    [],
  );

  return (
    <SettingsContext.Provider
      value={{
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
