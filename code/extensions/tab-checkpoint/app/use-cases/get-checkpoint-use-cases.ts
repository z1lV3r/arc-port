import type { BrowserTabsService } from "@repo/shared/domain/interfaces/browser-tabs-service";
import { Tab } from "@repo/shared/domain/models/tab";
import type { CheckpointRepository } from "../domain/interfaces/checkpoint-repository";

export class GetCheckpointUseCases {
  private tabsService: BrowserTabsService;
  private checkpointRepository: CheckpointRepository;

  constructor(
    tabsService: BrowserTabsService,
    checkpointRepository: CheckpointRepository,
  ) {
    this.tabsService = tabsService;
    this.checkpointRepository = checkpointRepository;
  }

  async getCurrentTabCheckpoint(): Promise<string> {
    const currentTab: Tab = await this.tabsService.getCurrentTab();
    return await this.checkpointRepository.get(currentTab.id);
  }
}
