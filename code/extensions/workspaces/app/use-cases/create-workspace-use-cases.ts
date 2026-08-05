import type { Workspace } from "../domain/models/workspace";
import type { WorkspaceRepository } from "../domain/interfaces/workspace-repository";

export class CreateWorkspaceUseCases {
  private workspaceRepository: WorkspaceRepository;

  constructor(
    workspaceRepository: WorkspaceRepository,
  ) {
    this.workspaceRepository = workspaceRepository;
  }

  async saveWorkspace(name: string, iconUrl: string, color: string): Promise<void> {
    const id = crypto.randomUUID();
    await this.workspaceRepository.create(id, name, iconUrl, color);
    // Create new window with extension options page
    const newWindow = await chrome.windows.create({ url: chrome.runtime.getURL("options.html") });
    
    // Pin the options tab
    if (newWindow.tabs?.[0]?.id) {
      await chrome.tabs.update(newWindow.tabs[0].id, { pinned: true });
    }

    // Create new empty tab
    const emptyTab = await chrome.tabs.create({ windowId: newWindow.id, active: true });

    if (emptyTab.id) {
      const groupId = await chrome.tabs.group({ 
        tabIds: emptyTab.id,
        createProperties: { windowId: newWindow.id }
      });
      await chrome.tabGroups.update(groupId, {
        title: name,
        color: color as chrome.tabGroups.ColorEnum,
      });
    }
  }

  async getWorkspace(id: string): Promise<Workspace> {
    return await this.workspaceRepository.get(id);
  }

  async listWorkspaces(): Promise<Workspace[]> {
    return await this.workspaceRepository.list();
  }

  async updateWorkspace(id: string, name: string, iconUrl: string, color:string): Promise<void> {
    await this.workspaceRepository.update(id, name, iconUrl, color);
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.delete(id);
  }
}
