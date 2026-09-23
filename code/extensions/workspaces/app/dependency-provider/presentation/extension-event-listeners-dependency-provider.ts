import type { ExtensionListener } from "@repo/shared/domain/models/extension-listener";
import { OnExtensionInstalledLoadDefaultSettings } from "../../presentation/browser-events/extension-event-listeners/on-extension-installed-load-default-settings.ts";
import { UseCasesDependencyProvider } from "../use-cases-dependency-provider.ts";

export class ExtensionEventListenersDependencyProvider {
  private static onExtensionInstalledListeners: ExtensionListener[];
  static getOnExtensionInstalledListeners(): ExtensionListener[] {
    if (this.onExtensionInstalledListeners) {
      return this.onExtensionInstalledListeners;
    }

    this.onExtensionInstalledListeners = [
      new OnExtensionInstalledLoadDefaultSettings(
        UseCasesDependencyProvider.getShowContextMenuSettingUseCases(),
        UseCasesDependencyProvider.getExtensionActionSettingUseCases(),
      ),
    ];

    return this.onExtensionInstalledListeners;
  }
}
