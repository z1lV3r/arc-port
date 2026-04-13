import type { CheckpointRepository } from "@/features/checkpoint/domain/interfaces/checkpoint-repository";

export class InMemoryCheckpointRepository implements CheckpointRepository {
  private storage = new Map<string, string>();

  async save(tabId: string, url: string): Promise<void> {
    this.storage.set(tabId, url);
  }

  async get(tabId: string): Promise<string> {
    return this.storage.get(tabId) || '';
  }

  async delete(tabId: string): Promise<void> {
    this.storage.delete(tabId);
  }
}