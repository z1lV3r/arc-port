import {ActionListener} from "@repo/shared/domain/models/action-listener";

export class OnClickShowPopUp implements ActionListener {
    name = "on-click-show-pop-up";
    description = t("browser_events.on_click_show_pop_up");
    popupPath = "popup.html";
    async command(): Promise<void> {}
}
