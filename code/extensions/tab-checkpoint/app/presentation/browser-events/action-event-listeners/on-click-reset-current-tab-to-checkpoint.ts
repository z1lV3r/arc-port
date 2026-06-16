import { ResetTabToCheckpointUseCases } from "@/app/use-cases/reset-tab-to-checkpoint-use-cases";
import {ActionListener} from "@repo/shared/domain/models/action-listener";

export class OnClickResetCurrentTabToCheckpoint implements ActionListener {
    private readonly resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases;

    constructor(resetTabToCheckpointUseCases: ResetTabToCheckpointUseCases) {
        this.resetTabToCheckpointUseCases = resetTabToCheckpointUseCases;
    }

    name = "on-click-reset-current-tab-to-checkpoint";
    description = t("browser_events.on_click_reset_current_tab_to_checkpoint");
    popupPath = "";
    async command(): Promise<void> {
        await this.resetTabToCheckpointUseCases.resetCurrentTabToCheckpoint();
    }
}
