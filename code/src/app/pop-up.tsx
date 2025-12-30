import { PopUp as DefaultUrl } from "@/features/default-url/presentation/pop-up";
import { ContextProvider } from "@/features/default-url/presentation/context-provider";

function PopUp() {
  return (
    <>
      <ContextProvider>
        <DefaultUrl />
      </ContextProvider>
    </>
  );
}

export default PopUp;
