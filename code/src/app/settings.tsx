import { Settings as DefaultUrlSettings } from "@/features/default-url/presentation/settings";
import { ContextProvider } from "@/features/default-url/presentation/pop-up-context";
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
