import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResetTabToDefaultUrlUseCases } from '@/features/default-url/use-cases/reset-tab-to-default-url-use-cases';
import type { DefaultUrlRepository } from '@/features/default-url/domain/interfaces/default-url-repository';
import { InMemoryDefaultUrlRepository } from '../../infrastructure/in-memory-default-url-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('ResetTabToDefaultUrlUseCases - resetOrCloseCurrentTabToDefaultUrl', () => {
  let useCases: ResetTabToDefaultUrlUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: DefaultUrlRepository;

  beforeEach(() => {
    mockRepository = new InMemoryDefaultUrlRepository();
    mockTabsService = new MockTabsService();
    useCases = new ResetTabToDefaultUrlUseCases(mockTabsService, mockRepository);
  });

  it('should close the tab if no default URL exists', async () => {
    // Arrange
    const tabId = 'tab-no-default';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://example.com' }]);
    
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetOrCloseCurrentTabToDefaultUrl();

    // Assert
    expect(closeTabSpy).toHaveBeenCalledWith(tabId);
    expect(createTabSpy).not.toHaveBeenCalled();
    await expect(mockTabsService.getTab(tabId)).rejects.toThrow();
  });

  it('should close the tab if the current URL matches the default URL', async () => {
    // Arrange
    const tabId = 'tab-same-url';
    const url = 'https://example.com';
    
    mockTabsService.setTabs([{ tabId, expectedUrl: url }]);
    await mockRepository.save(tabId, url);
    
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetOrCloseCurrentTabToDefaultUrl();

    // Assert
    expect(closeTabSpy).toHaveBeenCalledWith(tabId);
    expect(createTabSpy).not.toHaveBeenCalled();
     await expect(mockTabsService.getTab(tabId)).rejects.toThrow();
  });

  it('should reset the tab (create new, close old) if default URL differs from current', async () => {
    // Arrange
    const oldTabId = 'tab-diff-url';
    const defaultUrl = 'https://default.com';
    const currentUrl = 'https://current.com';
    
    mockTabsService.setTabs([{ tabId: oldTabId, expectedUrl: currentUrl }]);
    await mockRepository.save(oldTabId, defaultUrl);
    
    const createTabSpy = vi.spyOn(mockTabsService, 'createTab');
    const closeTabSpy = vi.spyOn(mockTabsService, 'closeTab');

    // Act
    await useCases.resetOrCloseCurrentTabToDefaultUrl();

    // Assert
    // Should create new tab first, then close old
    expect(createTabSpy).toHaveBeenCalledWith(defaultUrl, 0);
    expect(closeTabSpy).toHaveBeenCalledWith(oldTabId);
    
    // Verify default URL persistence for new tab
    const newTabResult = await createTabSpy.mock.results[0].value;
    const newTabId = newTabResult.id;
    const item = await mockRepository.get(newTabId);
    expect(item).toBe(defaultUrl);
  });
});