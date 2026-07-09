import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { CheckpointRepository } from "../domain/interfaces/checkpoint-repository";
import { Tab } from "../../../shared/domain/models/tab";

export class ClearCheckpointUseCases {

  private tabsService: BrowserTabsService;
  private checkpointRepository: CheckpointRepository;

  constructor(
    tabsService: BrowserTabsService,
    checkpointRepository: CheckpointRepository,
  ) {
    this.tabsService = tabsService;
    this.checkpointRepository = checkpointRepository;
  }

  async clearCurrentTabCheckpoint(): Promise<void> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    await this.clearTabCheckpoint(currentTab.id);
  }

  async clearTabCheckpoint(tabId: string): Promise<void> {
    await this.checkpointRepository.delete(tabId);
  }

}
