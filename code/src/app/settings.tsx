import { Settings as DefaultUrlSettings } from "@/features/checkpoint/presentation/settings";
import { ContextProvider } from "@/features/checkpoint/presentation/settings-context";
import { Settings as TabRebrandSettings } from "@/features/tab-rebrand/presentation/settings";
import { ContextProvider as TabRebrandContextProvider } from "@/features/tab-rebrand/presentation/settings-context";
function Settings() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <TabRebrandContextProvider>
        <TabRebrandSettings />
      </TabRebrandContextProvider>
      <ContextProvider>
        <DefaultUrlSettings />
      </ContextProvider>
    </div>
  );
}

export default Settings;
