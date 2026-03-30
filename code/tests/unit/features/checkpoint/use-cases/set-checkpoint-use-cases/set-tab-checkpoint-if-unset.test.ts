import { describe, it, expect, beforeEach } from 'vitest';
import { SetCheckpointUseCases } from '@/features/checkpoint/use-cases/set-checkpoint-use-cases';
import type { CheckpointRepository } from '@/features/checkpoint/domain/interfaces/checkpoint-repository';
import { InMemoryCheckpointRepository } from '../../infrastructure/in-memory-checkpoint-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('SetCheckpointUseCases - setTabCheckpointIfUnset', () => {
  let useCases: SetCheckpointUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: CheckpointRepository;

  beforeEach(() => {
    mockRepository = new InMemoryCheckpointRepository();
    mockTabsService = new MockTabsService();
    useCases = new SetCheckpointUseCases(mockTabsService, mockRepository);
  });

  it('should return the tab URL and save it as checkpoint if no checkpoint URL is set', async () => {
    // Arrange
    const tabId = 'tab-new-default';
    const currentUrl = 'https://example.com/page';
    mockTabsService.setTabs([{ tabId, expectedUrl: currentUrl }]);

    // Act
    const result = await useCases.setTabCheckpointIfUnset(tabId);

    // Assert
    // 1. Return values
    expect(result).toBe(currentUrl);

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(currentUrl);
  });

  it('should return the existing checkpoint URL and not overwrite if already set', async () => {
    // Arrange
    const tabId = 'tab-existing-default';
    const oldCheckpointUrl = 'https://default.com';
    const currentUrl = 'https://current.com';
    
    // Set initial storage state
    await mockRepository.save(tabId, oldCheckpointUrl);
    
    // Setup tab with different URL
    mockTabsService.setTabs([{ tabId, expectedUrl: currentUrl }]);

    // Act
    const result = await useCases.setTabCheckpointIfUnset(tabId);

    // Assert
    // 1. Return values (should correspond to the checkpoint URL, not the current one)
    expect(result).toBe(oldCheckpointUrl);

    // 2. Storage state (should remain unchanged)
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(oldCheckpointUrl);
  });

  it('should return an empty string and not save if the tab has no URL', async () => {
    // Arrange
    const tabId = 'tab-empty-url';
    const emptyUrl = '';
    mockTabsService.setTabs([{ tabId, expectedUrl: emptyUrl }]);

    // Act
    const result = await useCases.setTabCheckpointIfUnset(tabId);

    // Assert
    // 1. Return values
    expect(result).toBe('');

    // 2. Storage state (should be empty as initialized)
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe('');
  });
});