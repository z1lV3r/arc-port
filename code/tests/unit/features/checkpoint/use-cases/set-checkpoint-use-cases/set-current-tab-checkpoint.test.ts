import { describe, it, expect, beforeEach } from 'vitest';
import { SetCheckpointUseCases } from '@/features/checkpoint/use-cases/set-checkpoint-use-cases';
import type { CheckpointRepository } from '@/features/checkpoint/domain/interfaces/checkpoint-repository';
import { InMemoryCheckpointRepository } from '../../infrastructure/in-memory-checkpoint-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('SetCheckpointUseCases - setCurrentTabCheckpoint', () => {
  let useCases: SetCheckpointUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: CheckpointRepository;

  beforeEach(() => {
    mockRepository = new InMemoryCheckpointRepository();
    mockTabsService = new MockTabsService();
    useCases = new SetCheckpointUseCases(mockTabsService, mockRepository);
  });

  it("should set the current tab's URL as the checkpoint URL and return it", async () => {
    // Arrange
    const tabId = 'tab-123';
    const expectedUrl = 'https://example.com';
    mockTabsService.setTabs([{ tabId, expectedUrl }]);
    mockTabsService.setCurrentTab(tabId);

    // Act
    const result = await useCases.setCurrentTabCheckpoint();

    // Assert
    // 1. Return values
    expect(result).toBe(expectedUrl);

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(expectedUrl);
  });

  it('should not set a checkpoint URL if the current tab has no URL', async () => {
    // Arrange
    const tabId = 'tab-empty';
    mockTabsService.setTabs([{ tabId, expectedUrl: '' }]);
    mockTabsService.setCurrentTab(tabId);

    // Act
    const result = await useCases.setCurrentTabCheckpoint();

    // Assert
    // 1. Return values
    expect(result).toBe('');

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe('');
  });

  it('should overwrite an existing checkpoint URL for the current tab', async () => {
    // Arrange
    const tabId = 'tab-overwrite';
    const oldUrl = 'https://old.com';
    const newUrl = 'https://new.com';
    
    // Set initial state
    await mockRepository.save(tabId, oldUrl);
    
    // Setup tab with new URL
    mockTabsService.setTabs([{ tabId, expectedUrl: newUrl }]);
    mockTabsService.setCurrentTab(tabId);

    // Act
    const result = await useCases.setCurrentTabCheckpoint();

    // Assert
    // 1. Return values
    expect(result).toBe(newUrl);

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(newUrl);
  });
});