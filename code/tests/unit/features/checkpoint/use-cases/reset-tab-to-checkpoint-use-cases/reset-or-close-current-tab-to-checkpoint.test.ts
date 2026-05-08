import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResetTabToCheckpointUseCases } from '@/features/checkpoint/use-cases/reset-tab-to-checkpoint-use-cases';
import type { CheckpointRepository } from '@/features/checkpoint/domain/interfaces/checkpoint-repository';
import { InMemoryCheckpointRepository } from '../../infrastructure/in-memory-checkpoint-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';
import { Tab } from '@/shared/domain/models/tab';

describe('ResetTabToCheckpointUseCases - resetOrCloseCurrentTabToCheckpoint', () => {
  let useCases: ResetTabToCheckpointUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: CheckpointRepository;

  beforeEach(() => {
    mockRepository = new InMemoryCheckpointRepository();
    mockTabsService = new MockTabsService();
    useCases = new ResetTabToCheckpointUseCases(mockTabsService, mockRepository);
  });

  it('should close the tab if no checkpoint exists', async () => {
    // Arrange
    const tabId = 'tab-no-default';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://example.com' }]);
    
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetOrCloseCurrentTabToCheckpoint();

    // Assert
    expect(closeTabSpy).toHaveBeenCalledWith(tabId);
    expect(createTabSpy).not.toHaveBeenCalled();
    await expect(mockTabsService.getTab(tabId)).rejects.toThrow();
  });

  it('should close the tab if the current URL matches the checkpoint', async () => {
    // Arrange
    const tabId = 'tab-same-url';
    const url = 'https://example.com';
    
    mockTabsService.setTabs([{ tabId, expectedUrl: url }]);
    await mockRepository.save(tabId, url);
    
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetOrCloseCurrentTabToCheckpoint();

    // Assert
    expect(closeTabSpy).toHaveBeenCalledWith(tabId);
    expect(createTabSpy).not.toHaveBeenCalled();
     await expect(mockTabsService.getTab(tabId)).rejects.toThrow();
  });

  it('should reset the tab (create new, close old) if checkpoint differs from current', async () => {
    // Arrange
    const oldTabId = 'tab-diff-url';
    const checkpointUrl = 'https://default.com';
    const currentUrl = 'https://current.com';
    
    mockTabsService.setTabs([{ tabId: oldTabId, expectedUrl: currentUrl }]);
    await mockRepository.save(oldTabId, checkpointUrl);
    
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetOrCloseCurrentTabToCheckpoint();

    // Assert
    // Should create new tab first, then close old
    expect(createTabSpy).toHaveBeenCalledWith(expect.any(Tab));
    expect(closeTabSpy).toHaveBeenCalledWith(oldTabId);
    
    // Verify checkpoint URL persistence for new tab
    const newTabResult = await createTabSpy.mock.results[0].value;
    const newTabId = newTabResult.id;
    const item = await mockRepository.get(newTabId);
    expect(item).toBe(checkpointUrl);
  });
});