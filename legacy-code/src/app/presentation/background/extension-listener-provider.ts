import { DependencyProvider } from "@/app/dependency-provider";
import { CheckpointDependencyProvider } from "@/features/checkpoint/dependency-provider";
import { TabRebrandDependencyProvider } from "@/features/tab-rebrand/dependency-provider";
import { ExtensionListenerUseCases } from "@/app/use-cases/extension-listener-use-cases";

export class ExtensionListenerProvider {

  private extensionListenerUseCases: ExtensionListenerUseCases;

  constructor(
    extensionListenerUseCases: ExtensionListenerUseCases = DependencyProvider.getExtensionListenerUseCase(),
  ) {
    this.extensionListenerUseCases = extensionListenerUseCases;
  }

  registerFeaturesOnExtensionInstalledListeners() {
    this.extensionListenerUseCases.registerOnExtensionInstalledListeners([
      TabRebrandDependencyProvider.getOnExtensionInstalledListeners(),
      CheckpointDependencyProvider.getOnExtensionInstalledListeners(),
    ]);
  }
}
