import type { MessageEventListener } from "@/shared/domain/models/message-event-listener";

export class SetCurrentTabCustomNameMessageEventListener implements MessageEventListener {
  //private readonly setTabCustomNameUseCases: SetTabCustomNameUseCases;

  constructor(/*setTabCustomNameUseCases: SetTabCustomNameUseCases*/) {
//    this.setTabCustomNameUseCases = setTabCustomNameUseCases;
  }

  name = "set-current-tab-custom-name-message-event-listener";
  description = "Set current tab custom name message event listener";

  async command(_request: any, _sender: any, sendResponse: (response: any) => void): Promise<void> {
    //const url = await this.setCheckpointUseCases.setCurrentTabCheckpoint();
    //sendResponse({ success: true, data: url });
    console.info("Set current tab custom name message event listener");
    sendResponse({ success: true });
  }
}
