import { BrowserDependencyProvider } from "../infrastructure/browser-dependency-provider";
import { CreateWorkspaceMessageEventSender } from "../../presentation/messages/workspace/create-workspace-message-event-sender";
import { ListWorkspacesMessageEventSender } from "../../presentation/messages/workspace/list-workspaces-message-event-sender";
import { GetCurrentWorkspaceMessageEventSender } from "../../presentation/messages/workspace/get-current-workspace-message-event-sender";
import { GetAllWorkspaceOrderMessageEventSender } from "../../presentation/messages/workspace-order/get-all-workspace-order-message-event-sender";
import { ReorderWorkspaceMessageEventSender } from "../../presentation/messages/workspace-order/reorder-workspace-message-event-sender";
import { ActivateWorkspaceMessageEventSender } from "../../presentation/messages/workspace/activate-workspace-message-event-sender";
import { CreateWorkspaceMessageEventListener } from "../../presentation/messages/workspace/create-workspace-message-event-listener";
import { ListWorkspacesMessageEventListener } from "../../presentation/messages/workspace/list-workspaces-message-event-listener";
import { GetCurrentWorkspaceMessageEventListener } from "../../presentation/messages/workspace/get-current-workspace-message-event-listener";
import { GetAllWorkspaceOrderMessageEventListener } from "../../presentation/messages/workspace-order/get-all-workspace-order-message-event-listener";
import { ReorderWorkspaceMessageEventListener } from "../../presentation/messages/workspace-order/reorder-workspace-message-event-listener";
import { ActivateWorkspaceMessageEventListener } from "../../presentation/messages/workspace/activate-workspace-message-event-listener";
import { UseCasesDependencyProvider } from "../use-cases-dependency-provider";

export class MessageEventsSendersDependencyProvider {
  private static createWorkspaceMessageEventSender: CreateWorkspaceMessageEventSender;
  static getCreateWorkspaceMessageEventSender(): CreateWorkspaceMessageEventSender {
    if (!this.createWorkspaceMessageEventSender) {
      this.createWorkspaceMessageEventSender = new CreateWorkspaceMessageEventSender(
        BrowserDependencyProvider.getBrowserMessageService(),
        [new CreateWorkspaceMessageEventListener(UseCasesDependencyProvider.getCreateWorkspaceUseCases())]
      );
    }
    return this.createWorkspaceMessageEventSender;
  }

  private static listWorkspacesMessageEventSender: ListWorkspacesMessageEventSender;
  static getListWorkspacesMessageEventSender(): ListWorkspacesMessageEventSender {
    if (!this.listWorkspacesMessageEventSender) {
      this.listWorkspacesMessageEventSender = new ListWorkspacesMessageEventSender(
        BrowserDependencyProvider.getBrowserMessageService(),
        [new ListWorkspacesMessageEventListener(UseCasesDependencyProvider.getGetWorkspaceUseCases())]
      );
    }
    return this.listWorkspacesMessageEventSender;
  }

  private static getCurrentWorkspaceMessageEventSender: GetCurrentWorkspaceMessageEventSender;
  static getGetCurrentWorkspaceMessageEventSender(): GetCurrentWorkspaceMessageEventSender {
    if (!this.getCurrentWorkspaceMessageEventSender) {
      this.getCurrentWorkspaceMessageEventSender = new GetCurrentWorkspaceMessageEventSender(
        BrowserDependencyProvider.getBrowserMessageService(),
        BrowserDependencyProvider.getBrowserWindowService(),
        [new GetCurrentWorkspaceMessageEventListener(UseCasesDependencyProvider.getGetWorkspaceUseCases())]
      );
    }
    return this.getCurrentWorkspaceMessageEventSender;
  }

  private static getAllWorkspaceOrderMessageEventSender: GetAllWorkspaceOrderMessageEventSender;
  static getGetAllWorkspaceOrderMessageEventSender(): GetAllWorkspaceOrderMessageEventSender {
    if (!this.getAllWorkspaceOrderMessageEventSender) {
      this.getAllWorkspaceOrderMessageEventSender = new GetAllWorkspaceOrderMessageEventSender(
        BrowserDependencyProvider.getBrowserMessageService(),
        [new GetAllWorkspaceOrderMessageEventListener(UseCasesDependencyProvider.getOrderWorkspaceUseCases())]
      );
    }
    return this.getAllWorkspaceOrderMessageEventSender;
  }

  private static reorderWorkspaceMessageEventSender: ReorderWorkspaceMessageEventSender;
  static getReorderWorkspaceMessageEventSender(): ReorderWorkspaceMessageEventSender {
    if (!this.reorderWorkspaceMessageEventSender) {
      this.reorderWorkspaceMessageEventSender = new ReorderWorkspaceMessageEventSender(
        BrowserDependencyProvider.getBrowserMessageService(),
        [new ReorderWorkspaceMessageEventListener(UseCasesDependencyProvider.getOrderWorkspaceUseCases())]
      );
    }
    return this.reorderWorkspaceMessageEventSender;
  }

  private static activateWorkspaceMessageEventSender: ActivateWorkspaceMessageEventSender;
  static getActivateWorkspaceMessageEventSender(): ActivateWorkspaceMessageEventSender {
    if (!this.activateWorkspaceMessageEventSender) {
      this.activateWorkspaceMessageEventSender = new ActivateWorkspaceMessageEventSender(
        BrowserDependencyProvider.getBrowserMessageService(),
        [new ActivateWorkspaceMessageEventListener(UseCasesDependencyProvider.getActivateWorkspaceUseCases())]
      );
    }
    return this.activateWorkspaceMessageEventSender;
  }
}
