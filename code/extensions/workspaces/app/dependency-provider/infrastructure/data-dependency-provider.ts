import { WorkspaceRepository } from "../../domain/interfaces/workspace-repository.ts";
import { ChromeStorageWorkspaceRepository } from "../../infrastructure/chrome-storage-workspace-repository.ts";
import { WorkspaceOrderRepository } from "../../domain/interfaces/workspace-order-repository.ts";
import { ChromeStorageWorkspaceOrderRepository } from "../../infrastructure/chrome-storage-workspace-order-repository.ts";
import { WorkspaceWindowRepository } from "../../domain/interfaces/workspace-window-repository.ts";
import { ChromeSessionStorageWorkspaceWindowRepository } from "../../infrastructure/chrome-session-storage-workspace-window-repository.ts";

export class DataDependencyProvider {
  private static workspaceRepository: WorkspaceRepository;
  static getWorkspaceRepository(): WorkspaceRepository {
    if (this.workspaceRepository) {
      return this.workspaceRepository;
    }

    this.workspaceRepository = new ChromeStorageWorkspaceRepository();
    return this.workspaceRepository;
  }

  private static workspaceOrderRepository: WorkspaceOrderRepository;
  static getWorkspaceOrderRepository(): WorkspaceOrderRepository {
    if (this.workspaceOrderRepository) {
      return this.workspaceOrderRepository;
    }

    this.workspaceOrderRepository = new ChromeStorageWorkspaceOrderRepository();
    return this.workspaceOrderRepository;
  }

  private static workspaceWindowRepository: WorkspaceWindowRepository;
  static getWorkspaceWindowRepository(): WorkspaceWindowRepository {
    if (this.workspaceWindowRepository) {
      return this.workspaceWindowRepository;
    }

    this.workspaceWindowRepository = new ChromeSessionStorageWorkspaceWindowRepository();
    return this.workspaceWindowRepository;
  }
}
