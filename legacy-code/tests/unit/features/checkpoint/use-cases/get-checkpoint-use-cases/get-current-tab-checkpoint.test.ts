import { describe, it, expect, beforeEach } from 'vitest';
import { GetCheckpointUseCases } from '@/features/checkpoint/use-cases/get-checkpoint-use-cases';
import type { CheckpointRepository } from '@/features/checkpoint/domain/interfaces/checkpoint-repository';
import { InMemoryCheckpointRepository } from '../../infrastructure/in-memory-checkpoint-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('GetCheckpointUseCases - getCurrentTabCheckpoint', () => {
  let useCases: GetCheckpointUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: CheckpointRepository;

  beforeEach(() => {
    mockRepository = new InMemoryCheckpointRepository();
    mockTabsService = new MockTabsService();
    useCases = new GetCheckpointUseCases(mockTabsService, mockRepository);
  });

  it('should return an empty string if the current tab has no checkpoint in storage', async () => {
    // Arrange
    const tabId = 'tab-no-default';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://example.com' }]);
    
    // Act
    const result = await useCases.getCurrentTabCheckpoint();
    
    // Assert
    expect(result).toBe('');
  });

  it('should return the stored checkpoint if it exists for the current tab', async () => {
    // Arrange
    const tabId = 'tab-has-default';
    const checkpointUrl = 'https://default.com';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://current.com' }]);
    await mockRepository.save(tabId, checkpointUrl);
    
    // Act
    const result = await useCases.getCurrentTabCheckpoint();
    
    // Assert
    expect(result).toBe(checkpointUrl);
  });

  it('should consistently return the same value when called multiple times', async () => {
    // Arrange
    const tabId = 'tab-consistent';
    const checkpointUrl = 'https://persistent.com';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://current.com' }]);
    await mockRepository.save(tabId, checkpointUrl);
    
    // Act
    const result1 = await useCases.getCurrentTabCheckpoint();
    const result2 = await useCases.getCurrentTabCheckpoint();
    
    // Assert
    expect(result1).toBe(checkpointUrl);
    expect(result2).toBe(checkpointUrl);
    expect(result1).toBe(result2);
  });
});