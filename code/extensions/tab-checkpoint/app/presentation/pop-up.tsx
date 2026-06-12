import { Eraser, RotateCcw, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@repo/shared/presentation/button";
import { CopyClipboardButton } from "@repo/shared/presentation/copy-clipboard-button";
import {
  GroupCard,
  GroupCardContent,
  GroupCardHeader,
  GroupCardTitle,
} from "@repo/shared/presentation/group-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/shared/presentation/input-group";
import { Separator } from "@repo/shared/presentation/separator";

import { DependencyProvider } from "../dependency-provider";
import type { ClearCheckpointMessageEventSender } from "./messages/clear-checkpoint/_clear-checkpoint-message-event-sender";
import type { GetCheckpointMessageEventSender } from "./messages/get-checkpoint/_get-checkpoint-message-event-sender";
import type { ResetTabToCheckpointMessageEventSender } from "./messages/reset-tab-to-checkpoint/_reset-tab-to-checkpoint-message-event-sender";
import type { SetCheckpointMessageEventSender } from "./messages/set-checkpoint/_set-checkpoint-message-event-sender";

function PopUp() {
  const clearCheckpointMessageEventSender: ClearCheckpointMessageEventSender =
    DependencyProvider.getClearCheckpointMessageEventSender();
  const getCheckpointMessageEventSender: GetCheckpointMessageEventSender =
    DependencyProvider.getGetCheckpointMessageEventSender();
  const resetTabToCheckpointMessageEventSender: ResetTabToCheckpointMessageEventSender =
    DependencyProvider.getResetTabToCheckpointMessageEventSender();
  const setCheckpointMessageEventSender: SetCheckpointMessageEventSender =
    DependencyProvider.getSetCheckpointMessageEventSender();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const url =
        await getCheckpointMessageEventSender.sendGetCurrentTabCheckpointEventMessage();
      setUrl(url);
    };

    fetchInitialData();
  }, [getCheckpointMessageEventSender]);

  const handleSetCurrentTabCheckpoint = async () => {
    const url: string =
      await setCheckpointMessageEventSender.sendSetCurrentTabCheckpointEventMessage();
    setUrl(url);
  };

  const handleResetCurrentTabToCheckpoint = async () => {
    await resetTabToCheckpointMessageEventSender.sendResetCurrentTabToCheckpointEventMessage();
  };

  const handleClearCurrentTabCheckpoint = async () => {
    await clearCheckpointMessageEventSender.sendClearCurrentTabCheckpointEventMessage();
    setUrl("");
  };

  return (
    <GroupCard>
      <GroupCardHeader>
        <GroupCardTitle>{t("extension_name")}</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col items-center gap-2">
          <InputGroup>
            <InputGroupInput placeholder={"<" + t("pop_up.url.placeholder") + ">"} value={url} readOnly title={url} className="cursor-default" />
            <InputGroupAddon align="inline-end">
              <CopyClipboardButton value={url} disabled={!url} />
              <InputGroupButton
                onClick={handleResetCurrentTabToCheckpoint}
                disabled={!url}
                title={t("pop_up.button.reset")}
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
              {t("pop_up.button.set_current_url")}
            </Button>
            <Button
              variant="outline"
              className="hover:text-destructive"
              onClick={handleClearCurrentTabCheckpoint}
            >
              <Eraser className="text-destructive" />
              {t("pop_up.button.clear")}
            </Button>
          </div>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}

export { PopUp };
