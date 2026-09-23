import { ShowContextMenuSettingUseCases } from "../use-cases/show-context-menu-setting-use-cases.ts";
import { ExtensionActionSettingUseCases } from "../use-cases/extension-action-setting-use-cases.ts";
import { CreateWorkspaceUseCases } from "../use-cases/create-workspace-use-cases.ts";
import { GetWorkspaceUseCases } from "../use-cases/get-workspace-use-cases.ts";
import { OrderWorkspaceUseCases } from "../use-cases/order-workspace-use-cases.ts";
import { ActivateWorkspaceUseCases } from "../use-cases/activate-workspace-use-cases.ts";
import { LoadWorkspaceWindowUseCases } from "../use-cases/load-workspace-window-use-cases.ts";
import { LoadWorkspaceTabUseCases } from "../use-cases/load-workspace-tab-use-cases.ts";
import { LoadWorkspaceTabGroupUseCases } from "../use-cases/load-workspace-tab-group-use-cases.ts";
import { BrowserDependencyProvider } from "./infrastructure/browser-dependency-provider.ts";
import { DataDependencyProvider } from "./infrastructure/data-dependency-provider.ts";

export class UseCasesDependencyProvider {
  private static showContextMenuSettingUseCases: ShowContextMenuSettingUseCases;
  static getShowContextMenuSettingUseCases(): ShowContextMenuSettingUseCases {
    if (this.showContextMenuSettingUseCases) {
      return this.showContextMenuSettingUseCases;
    }

    this.showContextMenuSettingUseCases = new ShowContextMenuSettingUseCases(
      BrowserDependencyProvider.getSettingsRepository(),
    );

    return this.showContextMenuSettingUseCases;
  }

  private static extensionActionSettingUseCases: ExtensionActionSettingUseCases;
  static getExtensionActionSettingUseCases(): ExtensionActionSettingUseCases {
    if (this.extensionActionSettingUseCases) {
      return this.extensionActionSettingUseCases;
    }

    this.extensionActionSettingUseCases = new ExtensionActionSettingUseCases(
      BrowserDependencyProvider.getSettingsRepository(),
    );

    return this.extensionActionSettingUseCases;
  }

  private static createWorkspaceUseCases: CreateWorkspaceUseCases;
  static getCreateWorkspaceUseCases(): CreateWorkspaceUseCases {
    if (this.createWorkspaceUseCases) {
      return this.createWorkspaceUseCases;
    }

    this.createWorkspaceUseCases = new CreateWorkspaceUseCases(
      DataDependencyProvider.getWorkspaceRepository(),
      UseCasesDependencyProvider.getOrderWorkspaceUseCases(),
      UseCasesDependencyProvider.getActivateWorkspaceUseCases()
    );

    return this.createWorkspaceUseCases;
  }

  private static getWorkspaceUseCases: GetWorkspaceUseCases;
  static getGetWorkspaceUseCases(): GetWorkspaceUseCases {
    if (this.getWorkspaceUseCases) {
      return this.getWorkspaceUseCases;
    }

    this.getWorkspaceUseCases = new GetWorkspaceUseCases(
      DataDependencyProvider.getWorkspaceRepository(),
      BrowserDependencyProvider.getBrowserWindowService(),
      BrowserDependencyProvider.getBrowserTabsService()
    );

    return this.getWorkspaceUseCases;
  }

  private static orderWorkspaceUseCases: OrderWorkspaceUseCases;
  static getOrderWorkspaceUseCases(): OrderWorkspaceUseCases {
    if (this.orderWorkspaceUseCases) {
      return this.orderWorkspaceUseCases;
    }

    this.orderWorkspaceUseCases = new OrderWorkspaceUseCases(
      DataDependencyProvider.getWorkspaceOrderRepository()
    );

    return this.orderWorkspaceUseCases;
  }

  private static activateWorkspaceUseCases: ActivateWorkspaceUseCases;
  static getActivateWorkspaceUseCases(): ActivateWorkspaceUseCases {
    if (this.activateWorkspaceUseCases) {
      return this.activateWorkspaceUseCases;
    }

    this.activateWorkspaceUseCases = new ActivateWorkspaceUseCases(
      BrowserDependencyProvider.getBrowserWindowService(),
      DataDependencyProvider.getWorkspaceRepository(),
      UseCasesDependencyProvider.getLoadWorkspaceWindowUseCases(),
      DataDependencyProvider.getWorkspaceWindowRepository()
    );

    return this.activateWorkspaceUseCases;
  }

  private static loadWorkspaceWindowUseCases: LoadWorkspaceWindowUseCases;
  static getLoadWorkspaceWindowUseCases(): LoadWorkspaceWindowUseCases {
    if (this.loadWorkspaceWindowUseCases) {
      return this.loadWorkspaceWindowUseCases;
    }

    this.loadWorkspaceWindowUseCases = new LoadWorkspaceWindowUseCases(
      BrowserDependencyProvider.getBrowserWindowService(),
      UseCasesDependencyProvider.getLoadWorkspaceTabUseCases(),
      UseCasesDependencyProvider.getLoadWorkspaceTabGroupUseCases(),
      DataDependencyProvider.getWorkspaceWindowRepository()
    );

    return this.loadWorkspaceWindowUseCases;
  }

  private static loadWorkspaceTabUseCases: LoadWorkspaceTabUseCases;
  static getLoadWorkspaceTabUseCases(): LoadWorkspaceTabUseCases {
    if (this.loadWorkspaceTabUseCases) {
      return this.loadWorkspaceTabUseCases;
    }

    this.loadWorkspaceTabUseCases = new LoadWorkspaceTabUseCases(
      BrowserDependencyProvider.getBrowserTabsService()
    );

    return this.loadWorkspaceTabUseCases;
  }

  private static loadWorkspaceTabGroupUseCases: LoadWorkspaceTabGroupUseCases;
  static getLoadWorkspaceTabGroupUseCases(): LoadWorkspaceTabGroupUseCases {
    if (this.loadWorkspaceTabGroupUseCases) {
      return this.loadWorkspaceTabGroupUseCases;
    }

    this.loadWorkspaceTabGroupUseCases = new LoadWorkspaceTabGroupUseCases(
      BrowserDependencyProvider.getBrowserTabsService(),
      BrowserDependencyProvider.getBrowserTabGroupsService()
    );

    return this.loadWorkspaceTabGroupUseCases;
  }
}
