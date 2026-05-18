import { PopUp as Checkpoint } from "@/features/checkpoint/presentation/pop-up";
import { ContextProvider as CheckpointContextProvider } from "@/features/checkpoint/presentation/pop-up-context";
import { PopUp as TabRebrand } from "@/features/tab-rebrand/presentation/pop-up";
import { ContextProvider as TabRebrandContextProvider } from "@/features/tab-rebrand/presentation/pop-up-context";

function PopUp() {
  return (
    <div className="flex flex-col gap-4 w-fit min-w-80 px-2">
      <TabRebrandContextProvider>
        <TabRebrand />
      </TabRebrandContextProvider>
      <CheckpointContextProvider>
        <Checkpoint />
      </CheckpointContextProvider>
    </div>
  );
}

export default PopUp;
