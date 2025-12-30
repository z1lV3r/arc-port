import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/presentation/input-group";
import { CopyClipboardButton } from "@/shared/presentation/copy-clipboard-button";
import {
  GroupCard,
  GroupCardHeader,
  GroupCardTitle,
  GroupCardContent,
} from "@/shared/presentation/group-card";
import { Button } from "@/shared/presentation/button";
import { Separator } from "@/shared/presentation/separator";
import { RotateCcw, Eraser, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import { useDefaultUrlContext } from "./context-provider";
import { DefaultUrlUseCases } from "@/features/default-url/domain/default-url-use-cases";

function PopUp() {
  const [url, setUrl] = useState("");
  const { tabsService, defaultUrlRepository, browserService } =
    useDefaultUrlContext();

  const defaultUrlUseCases = new DefaultUrlUseCases(
    tabsService,
    defaultUrlRepository,
    browserService,
  );

  useEffect(() => {
    const fetchDefaultUrl = async () => {
      const defaultUrl: string =
        await defaultUrlUseCases.getCurrentTabDefaultUrl();
      setUrl(defaultUrl);
    };

    fetchDefaultUrl();
  }, []);

  const handleSetCurrentTabDefaultUrl = async () => {
    const defaultUrl: string =
      await defaultUrlUseCases.setCurrentTabDefaultUrl();
    setUrl(defaultUrl);
  };

  const handleResetTabToDefaultUrl = async () => {
    await defaultUrlUseCases.resetTabToDefaultUrl();
  };

  const handleClearDefaultUrl = async () => {
    await defaultUrlUseCases.clearCurrentTabDefaultUrl();
    setUrl("");
  };

  return (
    <GroupCard className="w-fit">
      <GroupCardHeader>
        <GroupCardTitle>Default URL</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col items-center gap-2">
          <InputGroup>
            <InputGroupInput placeholder="<empty>" value={url} disabled />
            <InputGroupAddon align="inline-end">
              <CopyClipboardButton value={url} disabled={!url} />
              <Separator orientation="vertical" />
              <InputGroupButton
                onClick={handleResetTabToDefaultUrl}
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
              onClick={handleSetCurrentTabDefaultUrl}
            >
              <SquarePen className="text-blue-500" />
              Set current URL
            </Button>
            <Button
              variant="outline"
              className="hover:text-destructive"
              onClick={handleClearDefaultUrl}
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
