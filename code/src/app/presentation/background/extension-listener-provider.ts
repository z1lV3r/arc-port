import { DependencyProvider } from "@/app/dependency-provider";
import { DefaultUrlDependencyProvider } from "@/features/default-url/dependency-provider";
import { ExtensionListenerUseCases } from "@/app/use-cases/extension-listener-use-cases";

export class ExtensionListenerProvider {

  private extensionListenerUseCases: ExtensionListenerUseCases;

  constructor(
    extensionListenerUseCases: ExtensionListenerUseCases = new DependencyProvider().getExtensionListenerUseCase(),
  ) {
    this.extensionListenerUseCases = extensionListenerUseCases;
  }

  registerFeaturesOnExtensionInstalledListeners() {
    this.extensionListenerUseCases.registerOnExtensionInstalledListeners([
      DefaultUrlDependencyProvider.getOnExtensionInstalledListeners(),
    ]);
  }
}