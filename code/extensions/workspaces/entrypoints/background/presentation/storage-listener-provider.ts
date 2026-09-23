import { StorageListenersDependencyProvider as AppDependencyProvider } from "@/app/dependency-provider/presentation/storage-listeners-dependency-provider";

import { DependencyProvider } from "../dependency-provider";
import { StorageListenerUseCases } from "../use-cases/storage-listener-use-cases";

export class StorageListenerProvider {
  private storageListenerUseCases: StorageListenerUseCases;

  constructor(
    storageListenerUseCases: StorageListenerUseCases = DependencyProvider.getStorageListenerUseCase(),
  ) {
    this.storageListenerUseCases = storageListenerUseCases;
  }

  registerFeaturesStorageListeners() {
    this.storageListenerUseCases.registerStorageListeners([
      AppDependencyProvider.getStorageListeners(),
    ]);
  }
}
