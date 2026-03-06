import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { SetDefaultUrlUseCases } from "@/features/default-url/use-cases/set-default-url-use-cases";
import type { ResetTabToDefaultUrlUseCases } from "@/features/default-url/use-cases/reset-tab-to-default-url-use-cases";
import type { GetDefaultUrlUseCases } from "@/features/default-url/use-cases/get-default-url-use-cases";
import type { ClearDefaultUrlUseCases } from "@/features/default-url/use-cases/clear-default-url-use-cases";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import type { SettingsUseCases } from "@/features/default-url/use-cases/settings-use-cases";

interface DefaultUrlContextType {
  setDefaultUrlUseCases: SetDefaultUrlUseCases;
  resetTabToDefaultUrlUseCases: ResetTabToDefaultUrlUseCases;
  getDefaultUrlUseCases: GetDefaultUrlUseCases;
  clearDefaultUrlUseCases: ClearDefaultUrlUseCases;
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const setDefaultUrlUseCases = useMemo(
    () => DefaultUrlDependencyProvider.getSetDefaultUrlUseCases(),
    [],
  );

  const resetTabToDefaultUrlUseCases = useMemo(
    () => DefaultUrlDependencyProvider.getResetTabToDefaultUrlUseCases(),
    [],
  );

  const getDefaultUrlUseCases = useMemo(
    () => DefaultUrlDependencyProvider.getGetDefaultUrlUseCases(),
    [],
  );

  const clearDefaultUrlUseCases = useMemo(
    () => DefaultUrlDependencyProvider.getClearDefaultUrlUseCases(),
    [],
  );

  const settingsUseCases = useMemo(
    () => DefaultUrlDependencyProvider.getSettingsUseCases(),
    [],
  );

  return (
    <DefaultUrlContext.Provider
      value={{
        setDefaultUrlUseCases,
        resetTabToDefaultUrlUseCases,
        getDefaultUrlUseCases,
        clearDefaultUrlUseCases,
        settingsUseCases,
      }}
    >
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
