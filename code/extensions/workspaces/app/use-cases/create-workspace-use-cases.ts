import type { WorkspaceWindowRepository } from "../domain/interfaces/workspace-window-repository";
import { WorkspaceTabGroup } from "../domain/models/workspace-tab-group";
import { ActivateWorkspaceUseCases } from "./activate-workspace-use-cases";
import type { OrderWorkspaceUseCases } from "./order-workspace-use-cases";
import type { WorkspaceTabGroupRepository } from "../domain/interfaces/workspace-tab-group-repository";
import type { WorkspaceTabRepository } from "../domain/interfaces/workspace-tab-repository";

export class CreateWorkspaceUseCases {
  private workspaceWindowRepository: WorkspaceWindowRepository;
  private orderWorkspaceUseCases: OrderWorkspaceUseCases;
  private activateWorkspaceUseCases: ActivateWorkspaceUseCases;
  private workspaceTabRepository: WorkspaceTabRepository;
  private workspaceTabGroupRepository: WorkspaceTabGroupRepository;

  constructor(
    workspaceRepository: WorkspaceWindowRepository,
    orderWorkspaceUseCases: OrderWorkspaceUseCases,
    activateWorkspaceUseCases: ActivateWorkspaceUseCases,
    workspaceTabRepository: WorkspaceTabRepository,
    workspaceTabGroupRepository: WorkspaceTabGroupRepository,
  ) {
    this.workspaceWindowRepository = workspaceRepository;
    this.orderWorkspaceUseCases = orderWorkspaceUseCases;
    this.activateWorkspaceUseCases = activateWorkspaceUseCases;
    this.workspaceTabRepository = workspaceTabRepository;
    this.workspaceTabGroupRepository = workspaceTabGroupRepository;
  }

  async createWorkspace(name: string, iconUrl: string, color: string): Promise<void> {
    const workspaceId = generateId();

    const workspaceTabId = generateId();
    await this.workspaceTabRepository.save(
      {
        id: workspaceTabId,
        checkpointUrl: `${chrome.runtime.getURL("page.html")}?workspaceId=${encodeURIComponent(workspaceId)}`,
        iconUrl: iconUrl,
        type: "ws"
      });


    const defaultTabGroupId = generateId();
    await this.workspaceTabGroupRepository.save({
      id: defaultTabGroupId,
      title: name,
      color: color,
      type: "ws",
    });

    const emptyTabId = generateId();
    await this.workspaceTabRepository.save(
      {
        id: emptyTabId,
        checkpointUrl: "",
        type: "std",
        tabGroupId: defaultTabGroupId,
      });

    await this.workspaceWindowRepository.save(
      {
        id: workspaceId,
        workspaceTabOrder: [workspaceTabId, emptyTabId]
      });

    await this.orderWorkspaceUseCases.push(workspaceId);

    await this.activateWorkspaceUseCases.activateWorkspace(workspaceId);
  }

}
