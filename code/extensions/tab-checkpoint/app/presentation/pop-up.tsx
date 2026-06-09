import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/shared/presentation/input-group";
import { CopyClipboardButton } from "@repo/shared/presentation/copy-clipboard-button";
import {
  GroupCard,
  GroupCardHeader,
  GroupCardTitle,
  GroupCardContent,
} from "@repo/shared/presentation/group-card";
import { Button } from "@repo/shared/presentation/button";
import { Separator } from "@repo/shared/presentation/separator";
import { RotateCcw, Eraser, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import { DependencyProvider } from "../dependency-provider";
import type { ClearCheckpointMessageEventSender } from "./background/message-events/clear-checkpoint-message-event-sender";
import type { GetCheckpointMessageEventSender } from "./background/message-events/get-checkpoint-message-event-sender";
import type { SetCheckpointMessageEventSender } from "./background/message-events/set-checkpoint-message-event-sender";

function PopUp() {
  const clearCheckpointMessageEventSender: ClearCheckpointMessageEventSender = DependencyProvider.getClearCheckpointMessageEventSender();
  const getCheckpointMessageEventSender: GetCheckpointMessageEventSender = DependencyProvider.getGetCheckpointMessageEventSender();
  const setCheckpointMessageEventSender: SetCheckpointMessageEventSender = DependencyProvider.getSetCheckpointMessageEventSender();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const url = await getCheckpointMessageEventSender.sendGetCurrentTabCheckpointEventMessage();
      setUrl(url);
    };

    fetchInitialData();
  }, [getCheckpointMessageEventSender]);

  const handleSetCurrentTabCheckpoint = async () => {
    const url: string =
      await setCheckpointMessageEventSender.sendSetCurrentTabCheckpointEventMessage();
    setUrl(url);
  };

  // const handleResetCurrentTabToCheckpoint = async () => {
  //   await resetTabToCheckpointMessageEventSender.sendResetCurrentTabToCheckpointEventMessage();
  // };

  const handleClearCurrentTabCheckpoint = async () => {
    await clearCheckpointMessageEventSender.sendClearCurrentTabCheckpointEventMessage();
    setUrl("");
  };

  return (
    <GroupCard>
      <GroupCardHeader>
        <GroupCardTitle>Checkpoint</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col items-center gap-2">
          <InputGroup>
            <InputGroupInput placeholder="<empty>" value={url} disabled />
            <InputGroupAddon align="inline-end">
              <CopyClipboardButton value={url} disabled={!url} />
              <Separator orientation="vertical" />
              <InputGroupButton
                // onClick={handleResetCurrentTabToCheckpoint}
                disabled={!url}
              >
                <RotateCcw />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              className="hover:text-blue-500"
              onClick={handleSetCurrentTabCheckpoint}
            >
              <SquarePen className="text-blue-500" />
              Set current URL
            </Button>
            <Button
              variant="outline"
              className="hover:text-destructive"
              onClick={handleClearCurrentTabCheckpoint}
            >
              <Eraser className="text-destructive" />
              Clear
            </Button>
          </div>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}

export { PopUp };
