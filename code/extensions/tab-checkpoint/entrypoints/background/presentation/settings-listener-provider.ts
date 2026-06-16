import { DependencyProvider as AppDependencyProvider } from "@/app/dependency-provider";

import { DependencyProvider } from "../dependency-provider";
import { SettingChangeEventListenerUseCases } from "../use-cases/settings-listener-use-cases";

export class SettingsEventListenerProvider {
  private useCaseEventListenersUseCases: SettingChangeEventListenerUseCases;

  constructor(
    useCaseEventListenersUseCases: SettingChangeEventListenerUseCases = DependencyProvider.getSettingChangeEventListenersUseCases(),
  ) {
    this.useCaseEventListenersUseCases = useCaseEventListenersUseCases;
  }

  registerFeaturesSettingsEventListeners() {
    this.useCaseEventListenersUseCases.registerSettingChangeEventListeners([
      AppDependencyProvider.getSettingChangeEventListeners(),
    ]);
  }
}
