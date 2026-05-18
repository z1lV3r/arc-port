import { createContext, useContext, useMemo, type ReactNode } from "react";
import { TabRebrandDependencyProvider } from "../dependency-provider";
import type { SetTabCustomNameMessageEventSender } from "./background/message-events/set-custom-name-message-event-senders";

interface TabRebrandContextType {
  setTabCustomNameMessageEventSender: SetTabCustomNameMessageEventSender;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const setTabCustomNameMessageEventSender = useMemo(
    () => TabRebrandDependencyProvider.getSetTabCustomNameMessageEventSender(),
    [],
  );

  return (
    <TabRebrandContext.Provider
      value={{
        setTabCustomNameMessageEventSender: setTabCustomNameMessageEventSender,
      }}
    >
      {children}
    </TabRebrandContext.Provider>
  );
}

const TabRebrandContext = createContext<TabRebrandContextType | undefined>(
  undefined,
);

export function useTabRebrandContext() {
  const context = useContext(TabRebrandContext);
  if (!context) {
    throw new Error(
      "useTabRebrandContext must be used within a TabRebrandContextProvider",
    );
  }
  return context;
}
