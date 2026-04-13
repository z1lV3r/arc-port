import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResetTabToCheckpointUseCases } from '@/features/checkpoint/use-cases/reset-tab-to-checkpoint-use-cases';
import type { CheckpointRepository } from '@/features/checkpoint/domain/interfaces/checkpoint-repository';
import { InMemoryCheckpointRepository } from '../../infrastructure/in-memory-checkpoint-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('ResetTabToCheckpointUseCases - resetCurrentTabToCheckpoint', () => {
  let useCases: ResetTabToCheckpointUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: CheckpointRepository;

  beforeEach(() => {
    mockRepository = new InMemoryCheckpointRepository();
    mockTabsService = new MockTabsService();
    useCases = new ResetTabToCheckpointUseCases(mockTabsService, mockRepository);
  });

  it('should do nothing if the current tab has no checkpoint', async () => {
    // Arrange
    const tabId = 'tab-no-default';
    const currentUrl = 'https://example.com';
    mockTabsService.setTabs([{ tabId, expectedUrl: currentUrl }]);
    
    // Spies
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetCurrentTabToCheckpoint();

    // Assert
    expect(createTabSpy).not.toHaveBeenCalled();
    expect(closeTabSpy).not.toHaveBeenCalled();
    expect(await mockTabsService.getTab(tabId)).toBeDefined();
  });

  it('should close the current tab and open a new one with the checkpoint URL if it exists', async () => {
    // Arrange
    const oldTabId = 'tab-old';
    const checkpointUrl = 'https://checkpoint.com';
    const currentUrl = 'https://current.com';
    
    mockTabsService.setTabs([{ tabId: oldTabId, expectedUrl: currentUrl }]);
    await mockRepository.save(oldTabId, checkpointUrl);

    // Spies
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetCurrentTabToCheckpoint();

    // Assert
    // 1. Check calls
    expect(closeTabSpy).toHaveBeenCalledWith(oldTabId);
    expect(createTabSpy).toHaveBeenCalledWith(checkpointUrl, 0, undefined); // Mock sets index to 0 by default

    // 2. Check logic: old tab gone, new tab exists
    await expect(mockTabsService.getTab(oldTabId)).rejects.toThrow();
    
    // 3. Check storage for new tab
    // We need to capture the returned new tab from the spy or by checking state
    // Since MockTabsService generates random IDs, we can't predict the new ID easily.
    // However, createTab returns the new tab. The Spy result can tell us.
    const newTabResult = await createTabSpy.mock.results[0].value;
    const newTabId = newTabResult.id;
    
    const savedUrl = await mockRepository.get(newTabId);
    expect(savedUrl).toBe(checkpointUrl);
  });

  it('should only affect the current tab', async () => {
    // Arrange
    const currentTabId = 'tab-current';
    const otherTabId = 'tab-other';
    const checkpointUrl = 'https://default.com';
    
    mockTabsService.setTabs([
        { tabId: currentTabId, expectedUrl: 'https://current.com' },
        { tabId: otherTabId, expectedUrl: 'https://other.com' } 
    ]);
    mockTabsService.setCurrentTab(currentTabId);
    
    await mockRepository.save(currentTabId, checkpointUrl);
    
    // Act
    await useCases.resetCurrentTabToCheckpoint();

    // Assert
    // Current tab closed
    await expect(mockTabsService.getTab(currentTabId)).rejects.toThrow();
    // Other tab remains
    const otherTab = await mockTabsService.getTab(otherTabId);
    expect(otherTab).toBeDefined();
    expect(otherTab.id).toBe(otherTabId);
  });
});