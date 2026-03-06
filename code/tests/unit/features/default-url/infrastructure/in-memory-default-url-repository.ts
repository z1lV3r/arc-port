import type { DefaultUrlRepository } from "@/features/default-url/domain/interfaces/default-url-repository";

export class InMemoryDefaultUrlRepository implements DefaultUrlRepository {
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