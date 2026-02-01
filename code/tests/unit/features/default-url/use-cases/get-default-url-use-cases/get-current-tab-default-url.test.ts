import { describe, it, expect, beforeEach } from 'vitest';
import { GetDefaultUrlUseCases } from '@/features/default-url/use-cases/get-default-url-use-cases';
import type { DefaultUrlRepository } from '@/features/default-url/domain/interfaces/default-url-repository';
import { InMemoryDefaultUrlRepository } from '../../infrastructure/in-memory-default-url-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('GetDefaultUrlUseCases - getCurrentTabDefaultUrl', () => {
  let useCases: GetDefaultUrlUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: DefaultUrlRepository;

  beforeEach(() => {
    mockRepository = new InMemoryDefaultUrlRepository();
    mockTabsService = new MockTabsService();
    useCases = new GetDefaultUrlUseCases(mockTabsService, mockRepository);
  });

  it('should return an empty string if the current tab has no default URL in storage', async () => {
    // Arrange
    const tabId = 'tab-no-default';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://example.com' }]);
    
    // Act
    const result = await useCases.getCurrentTabDefaultUrl();
    
    // Assert
    expect(result).toBe('');
  });

  it('should return the stored default URL if it exists for the current tab', async () => {
    // Arrange
    const tabId = 'tab-has-default';
    const defaultUrl = 'https://default.com';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://current.com' }]);
    await mockRepository.save(tabId, defaultUrl);
    
    // Act
    const result = await useCases.getCurrentTabDefaultUrl();
    
    // Assert
    expect(result).toBe(defaultUrl);
  });

  it('should consistently return the same value when called multiple times', async () => {
    // Arrange
    const tabId = 'tab-consistent';
    const defaultUrl = 'https://persistent.com';
    mockTabsService.setTabs([{ tabId, expectedUrl: 'https://current.com' }]);
    await mockRepository.save(tabId, defaultUrl);
    
    // Act
    const result1 = await useCases.getCurrentTabDefaultUrl();
    const result2 = await useCases.getCurrentTabDefaultUrl();
    
    // Assert
    expect(result1).toBe(defaultUrl);
    expect(result2).toBe(defaultUrl);
    expect(result1).toBe(result2);
  });
});