import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { CheckpointRepository } from "../domain/interfaces/checkpoint-repository";
import { Tab } from "../../../shared/domain/models/tab";

export class ResetTabToCheckpointUseCases {

  private tabsService: BrowserTabsService;
  private checkpointRepository: CheckpointRepository;

  constructor(
    tabsService: BrowserTabsService,
    checkpointRepository: CheckpointRepository,
  ) {
    this.tabsService = tabsService;
    this.checkpointRepository = checkpointRepository;
  }

  async resetCurrentTabToCheckpoint(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    const checkpoint: string = await this.checkpointRepository.get(
      currentTab.id,
    );
    await this.resetTabToCheckpoint(currentTab, checkpoint);
  }

  async resetOrCloseCurrentTabToCheckpoint(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    const checkpoint: string = await this.checkpointRepository.get(
      currentTab.id,
    );

    if (!checkpoint || checkpoint === currentTab.url) {
      await this.tabsService.closeTab(currentTab.id);
    } else {
      await this.resetTabToCheckpoint(currentTab, checkpoint);
    }
  }

  private async resetTabToCheckpoint(tab: Tab, checkpoint: string): Promise<void> {
    if (checkpoint) {
      tab.url = checkpoint;
      const newTab: Tab = await this.tabsService.createTab(tab);
      const closeTabPromise = this.tabsService.closeTab(tab.id);
      await this.checkpointRepository.save(newTab.id, checkpoint);
      await closeTabPromise;
    }
  }

}
