import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { Tab } from "@repo/shared/domain/models/tab";

import type { CheckpointRepository } from "../domain/interfaces/checkpoint-repository";

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
    console.log("Resetting current tab to checkpoint");
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    console.log("Current tab: ", currentTab);
    const checkpoint: string = await this.checkpointRepository.get(
      currentTab.id,
    );
    console.log("Checkpoint: ", checkpoint);
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

  private async resetTabToCheckpoint(
    tab: Tab,
    checkpoint: string,
  ): Promise<void> {
    console.log("Resetting tab to checkpoint");
    console.log("Tab: ", tab);
    console.log("Checkpoint: ", checkpoint);
    if (checkpoint) {
      tab.url = checkpoint;
      const newTab: Tab = await this.tabsService.createTab(tab);
      console.log("New tab: ", newTab);
      const closeTabPromise = this.tabsService.closeTab(tab.id);
      console.log("Close tab promise: ", closeTabPromise);
      await this.checkpointRepository.save(newTab.id, checkpoint);
      console.log("Checkpoint saved: ", checkpoint);
      await closeTabPromise;
      console.log("Tab closed");
    }
  }
}
