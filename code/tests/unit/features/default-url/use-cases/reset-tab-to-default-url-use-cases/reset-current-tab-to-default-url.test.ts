import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResetTabToDefaultUrlUseCases } from '@/features/default-url/use-cases/reset-tab-to-default-url-use-cases';
import type { DefaultUrlRepository } from '@/features/default-url/domain/interfaces/default-url-repository';
import { InMemoryDefaultUrlRepository } from '../../infrastructure/in-memory-default-url-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('ResetTabToDefaultUrlUseCases - resetCurrentTabToDefaultUrl', () => {
  let useCases: ResetTabToDefaultUrlUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: DefaultUrlRepository;

  beforeEach(() => {
    mockRepository = new InMemoryDefaultUrlRepository();
    mockTabsService = new MockTabsService();
    useCases = new ResetTabToDefaultUrlUseCases(mockTabsService, mockRepository);
  });

  it('should do nothing if the current tab has no default URL', async () => {
    // Arrange
    const tabId = 'tab-no-default';
    const currentUrl = 'https://example.com';
    mockTabsService.setTabs([{ tabId, expectedUrl: currentUrl }]);
    
    // Spies
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetCurrentTabToDefaultUrl();

    // Assert
    expect(createTabSpy).not.toHaveBeenCalled();
    expect(closeTabSpy).not.toHaveBeenCalled();
    expect(await mockTabsService.getTab(tabId)).toBeDefined();
  });

  it('should close the current tab and open a new one with the default URL if it exists', async () => {
    // Arrange
    const oldTabId = 'tab-old';
    const defaultUrl = 'https://default.com';
    const currentUrl = 'https://current.com';
    
    mockTabsService.setTabs([{ tabId: oldTabId, expectedUrl: currentUrl }]);
    await mockRepository.save(oldTabId, defaultUrl);

    // Spies
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetCurrentTabToDefaultUrl();

    // Assert
    // 1. Check calls
    expect(closeTabSpy).toHaveBeenCalledWith(oldTabId);
    expect(createTabSpy).toHaveBeenCalledWith(defaultUrl, 0); // Mock sets index to 0 by default

    // 2. Check logic: old tab gone, new tab exists
    await expect(mockTabsService.getTab(oldTabId)).rejects.toThrow();
    
    // 3. Check storage for new tab
    // We need to capture the returned new tab from the spy or by checking state
    // Since MockTabsService generates random IDs, we can't predict the new ID easily.
    // However, createTab returns the new tab. The Spy result can tell us.
    const newTabResult = await createTabSpy.mock.results[0].value;
    const newTabId = newTabResult.id;
    
    const savedUrl = await mockRepository.get(newTabId);
    expect(savedUrl).toBe(defaultUrl);
  });

  it('should only affect the current tab', async () => {
    // Arrange
    const currentTabId = 'tab-current';
    const otherTabId = 'tab-other';
    const defaultUrl = 'https://default.com';
    
    mockTabsService.setTabs([
        { tabId: currentTabId, expectedUrl: 'https://current.com' },
        { tabId: otherTabId, expectedUrl: 'https://other.com' } 
    ]);
    mockTabsService.setCurrentTab(currentTabId);
    
    await mockRepository.save(currentTabId, defaultUrl);
    
    // Act
    await useCases.resetCurrentTabToDefaultUrl();

    // Assert
    // Current tab closed
    await expect(mockTabsService.getTab(currentTabId)).rejects.toThrow();
    // Other tab remains
    const otherTab = await mockTabsService.getTab(otherTabId);
    expect(otherTab).toBeDefined();
    expect(otherTab.id).toBe(otherTabId);
  });
});