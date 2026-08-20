import { Archive, Eraser, Layers, Plus, RotateCcw, SquarePen } from "lucide-react";
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
import { ScrollArea, ScrollBar } from "@repo/shared/presentation/scroll-area";

import { DependencyProvider } from "../../dependency-provider";
import { ADD_VIEW_NAME } from "./add-workspace";
import { Workspace } from "@/app/domain/models/workspace";

export const LIST_VIEW_NAME = "list";
export function WorkspaceList({ currentView, setCurrentView }: { currentView: string, setCurrentView: (currentView: string) => void }) {
  const workspaceUseCases = DependencyProvider.getCreateWorkspaceUseCases();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const loadWorkspaces = async () => {
      const workspaces = await workspaceUseCases.listWorkspaces();
      setWorkspaces(workspaces);
    };

    loadWorkspaces();
  }, []);

  return (
    <GroupCard>
      <GroupCardHeader>
        <GroupCardTitle>{t("extension_name")}</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex items-center gap-3 w-full">
          <Button variant="outline" size="icon-sm" className="shrink-0 hover:border-yellow-500!" onClick={() => setCurrentView(ADD_VIEW_NAME)}><Archive className="text-yellow-500"/></Button>
          <ScrollArea className="flex rounded-md whitespace-nowrap mt-3" type="hover">
            <div className="flex w-max gap-1 pb-3">
              {workspaces.map((workspace) => (
                <Button variant="outline" size="icon-sm" aria-label={`${workspace.name} icon`} className="rounded-full hover:border-(--ws-color)!" style={{ "--ws-color": workspace.color } as React.CSSProperties} key={workspace.id} onClick={() => console.log(workspace)}>
                  
                  {workspace.iconUrl ? (
                    <img
                      src={workspace.iconUrl}
                      className="size-4.5"
                      style={{ imageRendering: "smooth" }}
                      />
                  ) : (
                    <Layers className="size-4.5" />
                  )}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Button variant="outline" size="icon-sm" className="shrink-0 hover:border-blue-500!" onClick={() => setCurrentView(ADD_VIEW_NAME)}><Plus className="text-blue-500"/></Button>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}
