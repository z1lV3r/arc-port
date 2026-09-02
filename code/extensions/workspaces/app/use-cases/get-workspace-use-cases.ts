import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";
import type { Workspace } from "../domain/models/workspace";

export class GetWorkspaceUseCases {
  private workspaceRepository: WorkspaceRepository;
  private browserWindowService: BrowserWindowService;
  private browserTabsService: BrowserTabsService;

  constructor(
    workspaceRepository: WorkspaceRepository,
    browserWindowService: BrowserWindowService,
    browserTabsService: BrowserTabsService,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.browserWindowService = browserWindowService;
    this.browserTabsService = browserTabsService;
  }

  async getWorkspace(id: string): Promise<Workspace> {
    return await this.workspaceRepository.get(id);
  }

  async getCurrentWorkspace(): Promise<Workspace> {
    const currentWindow = await this.browserWindowService.getCurrentWindow();
    const tab = await this.browserTabsService.getTabByIndex(0, currentWindow.id);
    if (!tab.url) {
      throw new Error("Failed to get current workspace");
    }
    const workspaceId = tab.url.split("?workspaceId=")[1];
    if (!workspaceId) {
      throw new Error("Failed to get current workspace");
    }
    return await this.workspaceRepository.get(workspaceId);
  }

  async listWorkspaces(): Promise<Workspace[]> {
    return await this.workspaceRepository.list();
  } 
}