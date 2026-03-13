import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { SetDefaultUrlMessageEventSender } from "@/features/default-url/presentation/background/message-events/set-default-url-message-event-sender";
import type { ResetTabToDefaultUrlMessageEventSender } from "@/features/default-url/presentation/background/message-events/reset-tab-to-default-url-message-event-sender";
import type { GetDefaultUrlMessageEventSender } from "@/features/default-url/presentation/background/message-events/get-default-url-message-event-sender";
import type { ClearDefaultUrlMessageEventSender } from "@/features/default-url/presentation/background/message-events/clear-default-url-message-event-sender";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import type { SettingsUseCases } from "@/features/default-url/use-cases/settings-use-cases";

interface DefaultUrlContextType {
  setDefaultUrlMessageEventSender: SetDefaultUrlMessageEventSender;
  resetTabToDefaultUrlMessageEventSender: ResetTabToDefaultUrlMessageEventSender;
  getDefaultUrlMessageEventSender: GetDefaultUrlMessageEventSender;
  clearDefaultUrlMessageEventSender: ClearDefaultUrlMessageEventSender;
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const setDefaultUrlMessageEventSender = useMemo(
    () => DefaultUrlDependencyProvider.getSetDefaultUrlMessageEventSender(),
    [],
  );

  const resetTabToDefaultUrlMessageEventSender = useMemo(
    () => DefaultUrlDependencyProvider.getResetTabToDefaultUrlMessageEventSender(),
    [],
  );

  const getDefaultUrlMessageEventSender = useMemo(
    () => DefaultUrlDependencyProvider.getGetDefaultUrlMessageEventSender(),
    [],
  );

  const clearDefaultUrlMessageEventSender = useMemo(
    () => DefaultUrlDependencyProvider.getClearDefaultUrlMessageEventSender(),
    [],
  );

  const settingsUseCases = useMemo(
    () => DefaultUrlDependencyProvider.getSettingsUseCases(),
    [],
  );

  return (
    <DefaultUrlContext.Provider
      value={{
        setDefaultUrlMessageEventSender,
        resetTabToDefaultUrlMessageEventSender,
        getDefaultUrlMessageEventSender,
        clearDefaultUrlMessageEventSender,
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
