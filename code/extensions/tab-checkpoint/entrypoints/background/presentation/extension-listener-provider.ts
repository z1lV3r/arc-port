import { DependencyProvider as AppDependencyProvider } from "@/app/dependency-provider";
import { DependencyProvider } from "../dependency-provider";
import { ExtensionListenerUseCases } from "../use-cases/extension-listener-use-cases";

export class ExtensionListenerProvider {
  private extensionListenerUseCase: ExtensionListenerUseCases;

  constructor(
    extensionListenerUseCase: ExtensionListenerUseCases = DependencyProvider.getExtensionListenerUseCase(),
  ) {
    this.extensionListenerUseCase = extensionListenerUseCase;
  }

  registerFeaturesOnExtensionInstalledListeners() {
    this.extensionListenerUseCase.registerOnExtensionInstalledListeners([
      AppDependencyProvider.getOnExtensionInstalledListeners(),
    ]);
  }
}
