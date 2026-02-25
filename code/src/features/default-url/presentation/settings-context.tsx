import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { ShortcutSettingsService } from "@/shared/domain/interfaces/shortcut-settings-service";
import { DefaultUrlShortcutListenerProvider } from "./background/shortcut-listener-provider";
import { DefaultUrlDependencyProvider } from "../dependency-provider";
import type { SettingsUseCases } from "../use-cases/settings-use-cases";

interface SettingsContextType {
  shortcutSettingsService: ShortcutSettingsService;
  defaultUrlShortcutListenerProvider: DefaultUrlShortcutListenerProvider;
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const dependencies = new DefaultUrlDependencyProvider();

  const shortcutSettingsService = useMemo(
    () => dependencies.getShortcutSettingsService(),
    [],
  );

  const defaultUrlShortcutListenerProvider = useMemo(
    () => new DefaultUrlShortcutListenerProvider(),
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
        defaultUrlShortcutListenerProvider,
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
