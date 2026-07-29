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

import { DependencyProvider } from "../../dependency-provider";
import { ADD_VIEW_NAME } from "./add-workspace";

export const LIST_VIEW_NAME = "list";
export function WorkspaceList({ currentView, setCurrentView }: { currentView: string, setCurrentView: (currentView: string) => void }) {

  return (
    <GroupCard>
      <GroupCardHeader>
        <GroupCardTitle>{t("extension_name")}</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col items-center gap-2">
          <Button onClick={() => setCurrentView(ADD_VIEW_NAME)}>{"List"}</Button>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}
