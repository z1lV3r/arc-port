import { Archive, Eraser, Layers, Plus, RotateCcw, SquarePen } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
import { cn } from "@repo/shared/lib/utils";

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

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const activeButtonRef = useRef<HTMLButtonElement | null>(null);

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

  // Scroll active workspace into view when defaultWorkspace is resolved or changes
  useEffect(() => {
    if (!defaultWorkspace || dragReorder.isDragging) return;

    let cancelled = false;
    let frames = 0;

    const tryScroll = () => {
      if (cancelled) return;
      const activeButton =
        activeButtonRef.current ??
        scrollAreaRef.current?.querySelector<HTMLButtonElement>('button[data-active="true"]');

      if (!activeButton) {
        if (frames++ < 5) requestAnimationFrame(tryScroll);
        return;
      }

      const viewport =
        scrollAreaRef.current?.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]") ??
        activeButton.closest<HTMLElement>("[data-radix-scroll-area-viewport]");

      if (viewport) {
        const buttonRect = activeButton.getBoundingClientRect();
        const viewportRect = viewport.getBoundingClientRect();
        const targetScrollLeft =
          viewport.scrollLeft +
          (buttonRect.left - viewportRect.left) -
          viewportRect.width / 2 +
          buttonRect.width / 2;
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (maxScroll > 0) {
          viewport.scrollTo({
            left: Math.max(0, Math.min(targetScrollLeft, maxScroll)),
            behavior: "smooth",
          });
        }
      } else {
        activeButton.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    };

    requestAnimationFrame(tryScroll);
    return () => {
      cancelled = true;
    };
  }, [defaultWorkspace?.id]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY === 0) return;
    const viewport =
      scrollAreaRef.current?.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]") ??
      e.currentTarget.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]");
    if (viewport) {
      viewport.scrollLeft += e.deltaY;
    }
  };

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
            <ScrollArea
              ref={scrollAreaRef}
              className="flex mx-auto rounded-md whitespace-nowrap mt-3"
              type="hover"
              onWheel={handleWheel}
            >
              <div className="flex w-max gap-1 pb-3 ">
                {orderedWorkspaces.map((workspace, index) => {
                  const { style: dragStyle, ...dragProps } = dragReorder.getItemProps(index);
                  const isActive = Boolean(defaultWorkspace?.id && defaultWorkspace.id === workspace.id);

                  return (
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label={`${workspace.name} icon`}
                      aria-current={isActive ? "page" : undefined}
                      data-active={isActive || undefined}
                      className={cn(
                        "rounded-full relative transition-all",
                        isActive
                          ? "border-(--ws-color)! bg-accent/60 shadow-xs"
                          : "hover:border-(--ws-color)! hover:bg-accent/40",
                      )}
                      style={{ ...dragStyle, "--ws-color": workspace.color } as React.CSSProperties}
                      key={workspace.id}
                      {...dragProps}
                      ref={(el) => {
                        dragProps.ref(el);
                        if (isActive) {
                          activeButtonRef.current = el;
                        }
                      }}
                      onClick={() => {
                        if (dragReorder.wasDragged()) return;
                        activateWorkspaceUseCases.activateWorkspace(workspace.id);
                        setDefaultWorkspace(workspace);
                        setCurrentWorkspace(workspace);
                      }}
                      onMouseEnter={() => setCurrentWorkspace(workspace)}
                      onMouseLeave={() => !dragReorder.isDragging && setCurrentWorkspace(defaultWorkspace)}
                    >
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
                      {isActive && (
                        <span
                          data-slot="active-indicator"
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-0.5 rounded-full bg-(--ws-color) shadow-xs pointer-events-none animate-in fade-in duration-200"
                        />
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
