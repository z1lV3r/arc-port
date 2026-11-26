import { StorageListener } from "@repo/shared/domain/models/storage-listener";

export class StorageListenersDependencyProvider {
  private static storageListeners: StorageListener[];
  static getStorageListeners(): StorageListener[] {
    if (this.storageListeners) {
      return this.storageListeners;
    }

    this.storageListeners = [
    ];

    return this.storageListeners;
  }
}
