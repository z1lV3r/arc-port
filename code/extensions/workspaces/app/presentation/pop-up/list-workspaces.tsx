import { Archive, Eraser, Layers, Plus, RotateCcw, SquarePen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@repo/shared/presentation/button";
import { Label } from "@repo/shared/presentation/label";
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
import { useDragReorder } from "./use-drag-reorder";
import { Workspace } from "@/app/domain/models/workspace";

export const LIST_VIEW_NAME = "list";
export function WorkspaceList({ currentView, setCurrentView }: { currentView: string, setCurrentView: (currentView: string) => void }) {
  const getWorkspaceUseCases = DependencyProvider.getGetWorkspaceUseCases();
  const getWorkspaceOrderUseCases = DependencyProvider.getOrderWorkspaceUseCases();
  const activateWorkspaceUseCases = DependencyProvider.getActivateWorkspaceUseCases();
  const [workspaceOrder, setWorkspaceOrder] = useState<string[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [defaultWorkspace, setDefaultWorkspace] = useState<Workspace | null>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    const loadWorkspaces = async () => {
      const workspaces = await getWorkspaceUseCases.listWorkspaces();
      setWorkspaces(workspaces);
      const workspaceOrder = await getWorkspaceOrderUseCases.getAll();
      setWorkspaceOrder(workspaceOrder);
      // The pop-up can be opened from a window that isn't a workspace, in which
      // case there is no current workspace to fall back to.
      try {
        const currentWorkspace = await getWorkspaceUseCases.getCurrentWorkspace();
        setDefaultWorkspace(currentWorkspace);
        setCurrentWorkspace(currentWorkspace);
      } catch {
        setDefaultWorkspace(null);
        setCurrentWorkspace(null);
      }
    };

    loadWorkspaces();
  }, []);

  // The stored order is the source of truth; anything it doesn't know about yet
  // (workspaces created before the order existed) is appended at the end.
  const orderedWorkspaces = useMemo(() => {
    const byId = new Map(workspaces.map((workspace) => [workspace.id, workspace]));
    const ordered = workspaceOrder
      .map((id) => byId.get(id))
      .filter((workspace): workspace is Workspace => workspace !== undefined);
    const known = new Set(ordered.map((workspace) => workspace.id));
    return [...ordered, ...workspaces.filter((workspace) => !known.has(workspace.id))];
  }, [workspaces, workspaceOrder]);

  const dragReorder = useDragReorder({
    ids: orderedWorkspaces.map((workspace) => workspace.id),
    onReorder: (ids) => {
      setWorkspaceOrder(ids);
      getWorkspaceOrderUseCases.reorder(ids);
    },
  });

  return (
    <GroupCard>
      <GroupCardHeader>
        <GroupCardTitle>{t("extension_name")}</GroupCardTitle>
      </GroupCardHeader>
      <GroupCardContent>
        <div className="flex flex-col items-center gap-0 mt-3">
          {/* min-h keeps the row below from shifting when the name appears on hover */}
          <Label id="workspaces" className="text-lg min-h-7" style={{ color: currentWorkspace?.color }}>{currentWorkspace?.name}</Label>
          <div className="flex items-center gap-3 w-full">
            <ScrollArea className="flex mx-auto rounded-md whitespace-nowrap mt-3" type="scroll">
              <div className="flex w-max gap-1 pb-3 ">
                {orderedWorkspaces.map((workspace, index) => {
                  const { style: dragStyle, ...dragProps } = dragReorder.getItemProps(index);
                  return (
                    <Button variant="outline" size="icon-sm" aria-label={`${workspace.name} icon`} className="rounded-full hover:border-(--ws-color)!" style={{ ...dragStyle, "--ws-color": workspace.color } as React.CSSProperties} key={workspace.id}
                      {...dragProps}
                      onClick={() => {
                        if (dragReorder.wasDragged()) return;
                        activateWorkspaceUseCases.activateWorkspace(workspace.id);
                      }}
                      onMouseEnter={() => setCurrentWorkspace(workspace)}
                      onMouseLeave={() => !dragReorder.isDragging && setCurrentWorkspace(defaultWorkspace)}>
                      {workspace.iconUrl ? (
                        <img
                          src={workspace.iconUrl}
                          className="size-4.5"
                          draggable={false}
                          style={{ imageRendering: "smooth" }}
                          />
                      ) : (
                        <Layers className="size-4.5" />
                      )}
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="flex items-center gap-3 w-full justify-center">
            <Button variant="outline" className="shrink-0 hover:border-yellow-500!" onClick={() => setCurrentView(ADD_VIEW_NAME)}><Archive className="text-yellow-500"/>{t("pop_up.button_archive")}</Button>
            <Button variant="outline" className="shrink-0 hover:border-blue-500!" onClick={() => setCurrentView(ADD_VIEW_NAME)}><Plus className="text-blue-500"/>{t("pop_up.button_new")}</Button>
          </div>
        </div>
      </GroupCardContent>
    </GroupCard>
  );
}
