import { createContext, useContext, useMemo, type ReactNode } from "react";
import { TabRebrandDependencyProvider } from "../dependency-provider";
import type { SetTabCustomNameMessageEventSender } from "./background/message-events/set-tab-custom-name-message-event-senders";
import type { GetTabCustomNameMessageEventSender } from "./background/message-events/get-tab-custom-name-message-event-senders";

interface TabRebrandContextType {
  setTabCustomNameMessageEventSender: SetTabCustomNameMessageEventSender;
  getTabCustomNameMessageEventSender: GetTabCustomNameMessageEventSender;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const setTabCustomNameMessageEventSender = useMemo(
    () => TabRebrandDependencyProvider.getSetTabCustomNameMessageEventSender(),
    [],
  );

  const getTabCustomNameMessageEventSender = useMemo(
    () => TabRebrandDependencyProvider.getGetTabCustomNameMessageEventSender(),
    [],
  );

  return (
    <TabRebrandContext.Provider
      value={{
        setTabCustomNameMessageEventSender: setTabCustomNameMessageEventSender,
        getTabCustomNameMessageEventSender: getTabCustomNameMessageEventSender,
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
