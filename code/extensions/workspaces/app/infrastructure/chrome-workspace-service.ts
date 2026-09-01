import { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { BrowserWorkspaceService } from "../domain/interfaces/browser-workspace-service";
import type { Workspace } from "../domain/models/workspace";
import type { BrowserWindowService } from "@repo/shared/domain/interfaces/browser-window-service";
import { BrowserTabGroupService } from "@repo/shared/domain/interfaces/browser-tab-group-service";

export class ChromeWorkspaceService implements BrowserWorkspaceService {

  private browserWindowService: BrowserWindowService;
  private browserTabsService: BrowserTabsService;
  private browserTabGroupService: BrowserTabGroupService;

  constructor(
    browserWindowService: BrowserWindowService,
    browserTabsService: BrowserTabsService,
    browserTabGroupService: BrowserTabGroupService,
  ) {
    this.browserWindowService = browserWindowService;
    this.browserTabsService = browserTabsService;
    this.browserTabGroupService = browserTabGroupService;

  }

  async createWorkspace(id: string, name: string, iconUrl: string, color: string): Promise<void> {
    
  }
  async getCurrentWorkspaceId(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async getWorkspace(id: string): Promise<Workspace> {
    throw new Error("Method not implemented.");
  }
  async listWorkspaces(): Promise<Workspace[]> {
    throw new Error("Method not implemented.");
  }
  async updateWorkspace(id: string, name: string, iconUrl: string, color: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteWorkspace(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}