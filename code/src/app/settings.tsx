import { Settings as DefaultUrlSettings } from "@/features/checkpoint/presentation/settings";
import { ContextProvider } from "@/features/checkpoint/presentation/settings-context";
function Settings() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <ContextProvider>
        <DefaultUrlSettings />
      </ContextProvider>
    </div>
  );
}

export default Settings;
