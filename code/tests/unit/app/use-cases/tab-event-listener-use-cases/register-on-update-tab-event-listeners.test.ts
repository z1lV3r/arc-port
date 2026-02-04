import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TabEventListenerUseCases } from '@/app/use-cases/tab-event-listener-use-cases';
import type { Listener } from '@/shared/domain/models/listener';
import { MockBrowserTabEventService } from '../../infrastructure/mock-browser-tab-event-service';

describe('TabEventListenerUseCases - registerOnUpdateTabEventListeners', () => {
  let useCases: TabEventListenerUseCases;
  let mockService: MockBrowserTabEventService;

  beforeEach(() => {
    mockService = new MockBrowserTabEventService();
    useCases = new TabEventListenerUseCases(mockService);
  });

  const createListener = (name: string): Listener => ({
    name,
    description: `Description for ${name}`,
    command: vi.fn().mockResolvedValue(undefined),
  });

  it('should register update listeners for a single feature', () => {
    // Arrange
    const featureListeners = [createListener('listener1'), createListener('listenerA')];

    // Act
    useCases.registerOnUpdateTabEventListeners([featureListeners]);

    // Assert
    expect(mockService.onUpdateStore).not.toBeNull();
    expect(mockService.onUpdateStore!.getListener('listener1')).toBeDefined();
    expect(mockService.onUpdateStore!.getListener('listenerA')).toBeDefined();
  });

  it('should register aggregated update listeners from multiple features', () => {
    // Arrange
    const feature1Listeners = [createListener('f1_l1')];
    const feature2Listeners = [createListener('f2_l1'), createListener('f2_l2')];

    // Act
    useCases.registerOnUpdateTabEventListeners([feature1Listeners, feature2Listeners]);

    // Assert
    expect(mockService.onUpdateStore).not.toBeNull();
    expect(mockService.onUpdateStore!.getListener('f1_l1')).toBeDefined();
    expect(mockService.onUpdateStore!.getListener('f2_l1')).toBeDefined();
    expect(mockService.onUpdateStore!.getListener('f2_l2')).toBeDefined();
  });

  it('should call service without errors but register no items when input is empty', () => {
    // Arrange
    const emptyListeners: Listener[][] = [];

    // Act
    useCases.registerOnUpdateTabEventListeners(emptyListeners);

    // Assert
    expect(mockService.onUpdateStore).not.toBeNull();
    const allListeners = Array.from(mockService.onUpdateStore!.getAllListeners());
    expect(allListeners).toHaveLength(0);
  });
});