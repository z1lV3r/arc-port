import { describe, it, expect, beforeEach } from 'vitest';
import { ClearDefaultUrlUseCases } from '@/features/default-url/use-cases/clear-default-url-use-cases';
import type { DefaultUrlRepository } from '@/features/default-url/domain/interfaces/default-url-repository';
import { InMemoryDefaultUrlRepository } from '../../infrastructure/in-memory-default-url-repository';
import { MockTabsService } from '../../infrastructure/mock-tabs-service';

describe('ClearDefaultUrlUseCases - clearTabDefaultUrl', () => {
  let useCases: ClearDefaultUrlUseCases;
  let mockTabsService: MockTabsService;
  let mockRepository: DefaultUrlRepository;

  beforeEach(() => {
    mockRepository = new InMemoryDefaultUrlRepository();
    mockTabsService = new MockTabsService();
    useCases = new ClearDefaultUrlUseCases(mockTabsService, mockRepository);
  });

  it('should complete without error and keep storage empty if tab has no default URL', async () => {
    // Arrange
    const tabId = 'tab-no-default-specific';
    
    // Act
    await useCases.clearTabDefaultUrl(tabId);
    
    // Assert
    const storedUrl = await mockRepository.get(tabId);
    expect(storedUrl).toBe('');
  });

  it('should remove the default URL from storage for the specific tab ID', async () => {
    // Arrange
    const tabId = 'tab-has-default-specific';
    const defaultUrl = 'https://default.com';
    await mockRepository.save(tabId, defaultUrl);
    
    // Act
    await useCases.clearTabDefaultUrl(tabId);
    
    // Assert
    const storedUrl = await mockRepository.get(tabId);
    expect(storedUrl).toBe('');
  });
});