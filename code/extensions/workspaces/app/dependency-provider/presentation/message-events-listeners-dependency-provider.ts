import { MessageEventListener } from "@repo/shared/domain/models/message-event-listener";
import { CreateWorkspaceMessageEventListener } from "../../presentation/messages/workspace/create-workspace-message-event-listener";
import { ListWorkspacesMessageEventListener } from "../../presentation/messages/workspace/list-workspaces-message-event-listener";
import { GetCurrentWorkspaceMessageEventListener } from "../../presentation/messages/workspace/get-current-workspace-message-event-listener";
import { GetAllWorkspaceOrderMessageEventListener } from "../../presentation/messages/workspace-order/get-all-workspace-order-message-event-listener";
import { ReorderWorkspaceMessageEventListener } from "../../presentation/messages/workspace-order/reorder-workspace-message-event-listener";
import { ActivateWorkspaceMessageEventListener } from "../../presentation/messages/workspace/activate-workspace-message-event-listener";
import { UseCasesDependencyProvider } from "../use-cases-dependency-provider";


export class MessageEventsListenersDependencyProvider {
  private static messageEventListeners: MessageEventListener[];
  static getMessageEventListeners(): MessageEventListener[] {
    if (this.messageEventListeners) {
      return this.messageEventListeners;
    }

    this.messageEventListeners = [
      new CreateWorkspaceMessageEventListener(UseCasesDependencyProvider.getCreateWorkspaceUseCases()),
      new ListWorkspacesMessageEventListener(UseCasesDependencyProvider.getGetWorkspaceUseCases()),
      new GetCurrentWorkspaceMessageEventListener(UseCasesDependencyProvider.getGetWorkspaceUseCases()),
      new GetAllWorkspaceOrderMessageEventListener(UseCasesDependencyProvider.getOrderWorkspaceUseCases()),
      new ReorderWorkspaceMessageEventListener(UseCasesDependencyProvider.getOrderWorkspaceUseCases()),
      new ActivateWorkspaceMessageEventListener(UseCasesDependencyProvider.getActivateWorkspaceUseCases()),
    ];

    return this.messageEventListeners;
  }
}
