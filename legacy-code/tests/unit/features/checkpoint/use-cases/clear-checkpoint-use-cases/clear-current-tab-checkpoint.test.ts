import { describe, it, expect, beforeEach } from 'vitest';
import { ClearCheckpointUseCases } from '@/features/checkpoint/use-cases/clear-checkpoint-use-cases';
import type { CheckpointRepository } from '@/features/checkpoint/domain/interfaces/checkpoint-repository';
import { InMemoryCheckpointRepository } from '../../infrastructure/in-memory-checkpoint-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('ClearCheckpointUseCases - clearCurrentTabCheckpoint', () => {
  let useCases: ClearCheckpointUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: CheckpointRepository;

  beforeEach(() => {
    mockRepository = new InMemoryCheckpointRepository();
    mockTabsService = new MockTabsService();
    useCases = new ClearCheckpointUseCases(mockTabsService, mockRepository);
  });

  it('should complete without error and keep storage empty if no checkpoint exists', async () => {
    // Arrange
    const tabId = 'tab-no-default';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://example.com' }]);
    
    // Act
    await useCases.clearCurrentTabCheckpoint();
    
    // Assert
    const storedUrl = await mockRepository.get(tabId);
    expect(storedUrl).toBe('');
  });

  it('should remove the checkpoint from storage if it exists', async () => {
    // Arrange
    const tabId = 'tab-has-default';
    const checkpointUrl = 'https://default.com';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://current.com' }]);
    await mockRepository.save(tabId, checkpointUrl);
    
    // Act
    await useCases.clearCurrentTabCheckpoint();
    
    // Assert
    const storedUrl = await mockRepository.get(tabId);
    expect(storedUrl).toBe('');
  });
});