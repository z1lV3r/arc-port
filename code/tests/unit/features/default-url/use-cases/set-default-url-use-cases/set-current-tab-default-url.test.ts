import { describe, it, expect, beforeEach } from 'vitest';
import { SetDefaultUrlUseCases } from '@/features/default-url/use-cases/set-default-url-use-cases';
import type { DefaultUrlRepository } from '@/features/default-url/domain/interfaces/default-url-repository';
import { Tab } from '@/features/default-url/domain/models/tab';
import { InMemoryDefaultUrlRepository } from '../../infrastructure/in-memory-default-url-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('SetDefaultUrlUseCases - setCurrentTabDefaultUrl', () => {
  let useCases: SetDefaultUrlUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: DefaultUrlRepository;

  beforeEach(() => {
    mockRepository = new InMemoryDefaultUrlRepository();
    mockTabsService = new MockTabsService();
    useCases = new SetDefaultUrlUseCases(mockTabsService, mockRepository);
  });

  it("should set the current tab's URL as the default URL and return it", async () => {
    // Arrange
    const tabId = 'tab-123';
    const expectedUrl = 'https://example.com';
    mockTabsService.setTabs([{ tabId, expectedUrl }]);
    mockTabsService.setCurrentTab(tabId);

    // Act
    const result = await useCases.setCurrentTabDefaultUrl();

    // Assert
    // 1. Return values
    expect(result).toBe(expectedUrl);

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(expectedUrl);
  });

  it('should not set a default URL if the current tab has no URL', async () => {
    // Arrange
    const tabId = 'tab-empty';
    mockTabsService.setTabs([{ tabId, expectedUrl: '' }]);
    mockTabsService.setCurrentTab(tabId);

    // Act
    const result = await useCases.setCurrentTabDefaultUrl();

    // Assert
    // 1. Return values
    expect(result).toBe('');

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe('');
  });

  it('should overwrite an existing default URL for the current tab', async () => {
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
    const result = await useCases.setCurrentTabDefaultUrl();

    // Assert
    // 1. Return values
    expect(result).toBe(newUrl);

    // 2. Storage state
    const savedUrl = await mockRepository.get(tabId);
    expect(savedUrl).toBe(newUrl);
  });
});