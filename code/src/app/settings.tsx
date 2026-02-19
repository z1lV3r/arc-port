import { Settings as DefaultUrlSettings } from "@/features/default-url/presentation/settings";
import { ContextProvider } from "@/features/default-url/presentation/pop-up-context";

function Settings() {
  return (
    <>
      <ContextProvider>
        <DefaultUrlSettings />
      </ContextProvider>
    </>
  );
}

export default Settings;
