import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TabEventListenerUseCases } from '@/app/use-cases/tab-event-listener-use-cases';
import type { TabEventListener } from '@/shared/domain/models/tab-event-listener';
import { MockBrowserTabEventService } from '../../infrastructure/mock-browser-tab-event-service';

describe('TabEventListenerUseCases - registerOnCloseTabEventListeners', () => {
  let useCases: TabEventListenerUseCases;
  let mockService: MockBrowserTabEventService;

  beforeEach(() => {
    mockService = new MockBrowserTabEventService();
    useCases = new TabEventListenerUseCases(mockService);
  });

  const createListener = (name: string): TabEventListener => ({
    name,
    description: `Description for ${name}`,
    command: vi.fn().mockResolvedValue(undefined),
  });

  it('should register close listeners for a single feature', () => {
    // Arrange
    const featureListeners = [createListener('listener1'), createListener('listenerA')];

    // Act
    useCases.registerOnCloseTabEventListeners([featureListeners]);

    // Assert
    expect(mockService.onCloseStore).not.toBeNull();
    expect(mockService.onCloseStore!.getListener('listener1')).toBeDefined();
    expect(mockService.onCloseStore!.getListener('listenerA')).toBeDefined();
  });

  it('should register aggregated close listeners from multiple features', () => {
    // Arrange
    const feature1Listeners = [createListener('f1_l1')];
    const feature2Listeners = [createListener('f2_l1'), createListener('f2_l2')];

    // Act
    useCases.registerOnCloseTabEventListeners([feature1Listeners, feature2Listeners]);

    // Assert
    expect(mockService.onCloseStore).not.toBeNull();
    expect(mockService.onCloseStore!.getListener('f1_l1')).toBeDefined();
    expect(mockService.onCloseStore!.getListener('f2_l1')).toBeDefined();
    expect(mockService.onCloseStore!.getListener('f2_l2')).toBeDefined();
  });

  it('should call service without errors but register no items when input is empty', () => {
    // Arrange
    const emptyListeners: TabEventListener[][] = [];

    // Act
    useCases.registerOnCloseTabEventListeners(emptyListeners);

    // Assert
    expect(mockService.onCloseStore).not.toBeNull();
    const allListeners = Array.from(mockService.onCloseStore!.getAllListeners());
    expect(allListeners).toHaveLength(0);
  });
});