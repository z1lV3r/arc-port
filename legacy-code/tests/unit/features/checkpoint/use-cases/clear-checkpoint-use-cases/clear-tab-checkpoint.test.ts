import { describe, it, expect, beforeEach } from 'vitest';
import { ClearCheckpointUseCases } from '@/features/checkpoint/use-cases/clear-checkpoint-use-cases';
import type { CheckpointRepository } from '@/features/checkpoint/domain/interfaces/checkpoint-repository';
import { InMemoryCheckpointRepository } from '../../infrastructure/in-memory-checkpoint-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('ClearCheckpointUseCases - clearTabCheckpoint', () => {
  let useCases: ClearCheckpointUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: CheckpointRepository;

  beforeEach(() => {
    mockRepository = new InMemoryCheckpointRepository();
    mockTabsService = new MockTabsService();
    useCases = new ClearCheckpointUseCases(mockTabsService, mockRepository);
  });

  it('should complete without error and keep storage empty if tab has no checkpoint', async () => {
    // Arrange
    const tabId = 'tab-no-default-specific';
    
    // Act
    await useCases.clearTabCheckpoint(tabId);
    
    // Assert
    const storedUrl = await mockRepository.get(tabId);
    expect(storedUrl).toBe('');
  });

  it('should remove the checkpoint from storage for the specific tab ID', async () => {
    // Arrange
    const tabId = 'tab-has-default-specific';
    const checkpointUrl = 'https://default.com';
    await mockRepository.save(tabId, checkpointUrl);
    
    // Act
    await useCases.clearTabCheckpoint(tabId);
    
    // Assert
    const storedUrl = await mockRepository.get(tabId);
    expect(storedUrl).toBe('');
  });
});