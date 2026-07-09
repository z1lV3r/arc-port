import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { SetCheckpointMessageEventSender } from "@/features/checkpoint/presentation/background/message-events/set-checkpoint-message-event-sender";
import type { ResetTabToCheckpointMessageEventSender } from "@/features/checkpoint/presentation/background/message-events/reset-tab-to-checkpoint-message-event-sender";
import type { GetCheckpointMessageEventSender } from "@/features/checkpoint/presentation/background/message-events/get-checkpoint-message-event-sender";
import type { ClearCheckpointMessageEventSender } from "@/features/checkpoint/presentation/background/message-events/clear-checkpoint-message-event-sender";
import { CheckpointDependencyProvider } from "@/features/checkpoint/dependency-provider";
import type { SettingsUseCases } from "@/features/checkpoint/use-cases/settings-use-cases";

interface CheckpointContextType {
  setCheckpointMessageEventSender: SetCheckpointMessageEventSender;
  resetTabToCheckpointMessageEventSender: ResetTabToCheckpointMessageEventSender;
  getCheckpointMessageEventSender: GetCheckpointMessageEventSender;
  clearCheckpointMessageEventSender: ClearCheckpointMessageEventSender;
  settingsUseCases: SettingsUseCases;
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const setCheckpointMessageEventSender = useMemo(
    () => CheckpointDependencyProvider.getSetCheckpointMessageEventSender(),
    [],
  );

  const resetTabToCheckpointMessageEventSender = useMemo(
    () => CheckpointDependencyProvider.getResetTabToCheckpointMessageEventSender(),
    [],
  );

  const getCheckpointMessageEventSender = useMemo(
    () => CheckpointDependencyProvider.getGetCheckpointMessageEventSender(),
    [],
  );

  const clearCheckpointMessageEventSender = useMemo(
    () => CheckpointDependencyProvider.getClearCheckpointMessageEventSender(),
    [],
  );

  const settingsUseCases = useMemo(
    () => CheckpointDependencyProvider.getSettingsUseCases(),
    [],
  );

  return (
    <CheckpointContext.Provider
      value={{
        setCheckpointMessageEventSender: setCheckpointMessageEventSender,
        resetTabToCheckpointMessageEventSender: resetTabToCheckpointMessageEventSender,
        getCheckpointMessageEventSender: getCheckpointMessageEventSender,
        clearCheckpointMessageEventSender: clearCheckpointMessageEventSender,
        settingsUseCases,
      }}
    >
      {children}
    </CheckpointContext.Provider>
  );
}

const CheckpointContext = createContext<CheckpointContextType | undefined>(
  undefined,
);

export function useCheckpointContext() {
  const context = useContext(CheckpointContext);
  if (!context) {
    throw new Error(
      "useCheckpointContext must be used within a CheckpointContextProvider",
    );
  }
  return context;
}
