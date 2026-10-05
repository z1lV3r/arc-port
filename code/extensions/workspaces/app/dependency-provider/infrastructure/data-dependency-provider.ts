import { WorkspaceRepository } from "../../domain/interfaces/workspace-repository.ts";
import { ChromeStorageWorkspaceRepository } from "../../infrastructure/chrome-storage-workspace-repository.ts";
import { WorkspaceOrderRepository } from "../../domain/interfaces/workspace-order-repository.ts";
import { ChromeStorageWorkspaceOrderRepository } from "../../infrastructure/chrome-storage-workspace-order-repository.ts";
import { WorkspaceWindowSessionRepository } from "../../domain/interfaces/workspace-window-session-repository.ts";
import { ChromeSessionStorageWorkspaceWindowSessionRepository } from "../../infrastructure/chrome-session-storage-workspace-window-repository.ts";
import { WorkspaceTabSessionRepository } from "../../domain/interfaces/workspace-tab-session-repository.ts";
import { ChromeSessionStorageWorkspaceTabSessionRepository } from "../../infrastructure/chrome-session-storage-workspace-tab-session-repository.ts";
import { WorkspaceTabGroupSessionRepository } from "../../domain/interfaces/workspace-tab-group-session-repository.ts";
import { ChromeSessionStorageWorkspaceTabGroupSessionRepository } from "../../infrastructure/chrome-session-storage-workspace-tab-group-session-repository.ts";

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

  private static workspaceWindowRepository: WorkspaceWindowSessionRepository;
  static getWorkspaceWindowRepository(): WorkspaceWindowSessionRepository {
    if (this.workspaceWindowRepository) {
      return this.workspaceWindowRepository;
    }

    this.workspaceWindowRepository = new ChromeSessionStorageWorkspaceWindowSessionRepository();
    return this.workspaceWindowRepository;
  }

  private static workspaceTabSessionRepository: WorkspaceTabSessionRepository;
  static getWorkspaceTabSessionRepository(): WorkspaceTabSessionRepository {
    if (this.workspaceTabSessionRepository) {
      return this.workspaceTabSessionRepository;
    }

    this.workspaceTabSessionRepository = new ChromeSessionStorageWorkspaceTabSessionRepository();
    return this.workspaceTabSessionRepository;
  }

  private static workspaceTabGroupSessionRepository: WorkspaceTabGroupSessionRepository;
  static getWorkspaceTabGroupSessionRepository(): WorkspaceTabGroupSessionRepository {
    if (this.workspaceTabGroupSessionRepository) {
      return this.workspaceTabGroupSessionRepository;
    }

    this.workspaceTabGroupSessionRepository = new ChromeSessionStorageWorkspaceTabGroupSessionRepository();
    return this.workspaceTabGroupSessionRepository;
  }
}
