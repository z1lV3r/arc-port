import { PopUp as Checkpoint } from "@/features/checkpoint/presentation/pop-up";
import { ContextProvider } from "@/features/checkpoint/presentation/pop-up-context";

function PopUp() {
  return (
    <>
      <ContextProvider>
        <Checkpoint />
      </ContextProvider>
    </>
  );
}

export default PopUp;
