import { describe, it, expect, beforeEach } from 'vitest';
import { SetDefaultUrlUseCases } from '@/features/default-url/use-cases/set-default-url-use-cases';
import type { DefaultUrlRepository } from '@/features/default-url/domain/interfaces/default-url-repository';
import { InMemoryDefaultUrlRepository } from '../../infrastructure/in-memory-default-url-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('SetDefaultUrlUseCases - setTabDefaultUrlIfUnset', () => {
  let useCases: SetDefaultUrlUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: DefaultUrlRepository;

  beforeEach(() => {
    mockRepository = new InMemoryDefaultUrlRepository();
    mockTabsService = new MockTabsService();
    useCases = new SetDefaultUrlUseCases(mockTabsService, mockRepository);
  });

  it('should return the tab URL and save it as default if no default URL is set', async () => {
    // Arrange
    const tabId = 'tab-new-default';
    const currentUrl = 'https://example.com/page';
    mockTabsService.setTabs([{ tabId, expectedUrl: currentUrl }]);

    // Act
    const result = await useCases.setTabDefaultUrlIfUnset(tabId);

    // Assert
    // 1. Return values
    expect(result).toBe(currentUrl);

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(currentUrl);
  });

  it('should return the existing default URL and not overwrite if already set', async () => {
    // Arrange
    const tabId = 'tab-existing-default';
    const oldDefaultUrl = 'https://default.com';
    const currentUrl = 'https://current.com';
    
    // Set initial storage state
    await mockRepository.save(tabId, oldDefaultUrl);
    
    // Setup tab with different URL
    mockTabsService.setTabs([{ tabId, expectedUrl: currentUrl }]);

    // Act
    const result = await useCases.setTabDefaultUrlIfUnset(tabId);

    // Assert
    // 1. Return values (should correspond to the default URL, not the current one)
    expect(result).toBe(oldDefaultUrl);

    // 2. Storage state (should remain unchanged)
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(oldDefaultUrl);
  });

  it('should return an empty string and not save if the tab has no URL', async () => {
    // Arrange
    const tabId = 'tab-empty-url';
    const emptyUrl = '';
    mockTabsService.setTabs([{ tabId, expectedUrl: emptyUrl }]);

    // Act
    const result = await useCases.setTabDefaultUrlIfUnset(tabId);

    // Assert
    // 1. Return values
    expect(result).toBe('');

    // 2. Storage state (should be empty as initialized)
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe('');
  });
});