import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import type { CheckpointRepository } from "../domain/interfaces/checkpoint-repository";
import { Tab } from "@repo/shared/domain/models/tab";

export class SetCheckpointUseCases {

  private tabsService: BrowserTabsService;
  private checkpointRepository: CheckpointRepository;

  constructor(
    tabsService: BrowserTabsService,
    checkpointRepository: CheckpointRepository,
  ) {
    this.tabsService = tabsService;
    this.checkpointRepository = checkpointRepository;
  }

  async setCurrentTabCheckpoint(): Promise<string> {
    console.log("sisi")
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    console.log("sisisi")
    return await this.setTabCheckpoint(currentTab);
  }

  async setTabCheckpointIfUnset(tabId: string): Promise<string> {
    const tab: Tab = await this.tabsService.getTab(tabId);
    const checkpoint: string = await this.checkpointRepository.get(tab.id);
    if (checkpoint) {
      return checkpoint;
    }
    return await this.setTabCheckpoint(tab);
  }

  private async setTabCheckpoint(tab: Tab): Promise<string> {
    if (!tab.url) {
      return "";
    }
    await this.checkpointRepository.save(tab.id, tab.url);
    const checkpoint: string = await this.checkpointRepository.get(tab.id);
    return checkpoint;
  }

}
