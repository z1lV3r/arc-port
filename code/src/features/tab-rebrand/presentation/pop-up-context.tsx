import { createContext, useContext, useMemo, type ReactNode } from "react";
import { TabRebrandDependencyProvider } from "../dependency-provider";
import type { SetTabCustomNameMessageEventSender } from "./custom-name/background/message-events/set-tab-custom-name-message-event-senders";
import type { GetTabCustomNameMessageEventSender } from "./custom-name/background/message-events/get-tab-custom-name-message-event-senders";
import type { ClearTabCustomNameMessageEventSender } from "./custom-name/background/message-events/clear-tab-custom-name-message-event-senders";

interface TabRebrandContextType {
  setTabCustomNameMessageEventSender: SetTabCustomNameMessageEventSender;
  getTabCustomNameMessageEventSender: GetTabCustomNameMessageEventSender;
  clearTabCustomNameMessageEventSender: ClearTabCustomNameMessageEventSender;
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

  const clearTabCustomNameMessageEventSender = useMemo(
    () => TabRebrandDependencyProvider.getClearTabCustomNameMessageEventSender(),
    [],
  );

  return (
    <TabRebrandContext.Provider
      value={{
        setTabCustomNameMessageEventSender: setTabCustomNameMessageEventSender,
        getTabCustomNameMessageEventSender: getTabCustomNameMessageEventSender,
        clearTabCustomNameMessageEventSender: clearTabCustomNameMessageEventSender,
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
