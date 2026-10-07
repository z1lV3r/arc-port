import { WorkspaceWindowRepository } from "../../domain/interfaces/workspace-window-repository.ts";
import { ChromeStorageWorkspaceRepository } from "../../infrastructure/chrome-storage-workspace-repository.ts";
import { WorkspaceOrderRepository } from "../../domain/interfaces/workspace-order-repository.ts";
import { ChromeStorageWorkspaceOrderRepository } from "../../infrastructure/chrome-storage-workspace-order-repository.ts";
import { WorkspaceWindowSessionRepository } from "../../domain/interfaces/workspace-window-session-repository.ts";
import { ChromeSessionStorageWorkspaceWindowSessionRepository } from "../../infrastructure/chrome-session-storage-workspace-window-repository.ts";
import { WorkspaceTabSessionRepository } from "../../domain/interfaces/workspace-tab-session-repository.ts";
import { ChromeSessionStorageWorkspaceTabSessionRepository } from "../../infrastructure/chrome-session-storage-workspace-tab-session-repository.ts";
import { WorkspaceTabGroupSessionRepository } from "../../domain/interfaces/workspace-tab-group-session-repository.ts";
import { ChromeSessionStorageWorkspaceTabGroupSessionRepository } from "../../infrastructure/chrome-session-storage-workspace-tab-group-session-repository.ts";
import { WorkspaceTabRepository } from "../../domain/interfaces/workspace-tab-repository.ts";
import { ChromeStorageWorkspaceTabRepository } from "../../infrastructure/chrome-storage-workspace-tab-repository.ts";
import { WorkspaceTabGroupRepository } from "../../domain/interfaces/workspace-tab-group-repository.ts";
import { ChromeStorageWorkspaceTabGroupRepository } from "../../infrastructure/chrome-storage-workspace-tab-group-repository.ts";

export class DataDependencyProvider {
  private static workspaceRepository: WorkspaceWindowRepository;
  static getWorkspaceRepository(): WorkspaceWindowRepository {
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

  private static workspaceTabRepository: WorkspaceTabRepository;
  static getWorkspaceTabRepository(): WorkspaceTabRepository {
    if (this.workspaceTabRepository) {
      return this.workspaceTabRepository;
    }

    this.workspaceTabRepository = new ChromeStorageWorkspaceTabRepository();
    return this.workspaceTabRepository;
  }

  private static workspaceTabGroupRepository: WorkspaceTabGroupRepository;
  static getWorkspaceTabGroupRepository(): WorkspaceTabGroupRepository {
    if (this.workspaceTabGroupRepository) {
      return this.workspaceTabGroupRepository;
    }

    this.workspaceTabGroupRepository = new ChromeStorageWorkspaceTabGroupRepository();
    return this.workspaceTabGroupRepository;
  }
}
