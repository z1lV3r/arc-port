import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { CheckpointRepository } from "../domain/interfaces/checkpoint-repository";
import { Tab } from "../../../shared/domain/models/tab";

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
    const checkpoint: string = await this.checkpointRepository.get(
      currentTab.id,
    );
    return checkpoint;
  }

}
