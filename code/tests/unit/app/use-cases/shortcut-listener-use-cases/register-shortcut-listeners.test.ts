import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ShortcutListenerUseCases } from '@/app/use-cases/shortcut-listener-use-cases';
import type { Listener } from '@/shared/domain/models/listener';
import { MockBrowserShortcutService } from '../../infrastructure/mock-browser-shortcut-service';

describe('ShortcutListenerUseCases - registerShortcutListeners', () => {
  let useCases: ShortcutListenerUseCases;
  let mockService: MockBrowserShortcutService;

  beforeEach(() => {
    mockService = new MockBrowserShortcutService();
    useCases = new ShortcutListenerUseCases(mockService);
  });

  const createListener = (name: string): Listener => ({
    name,
    description: `Description for ${name}`,
    command: vi.fn().mockResolvedValue(undefined),
  });

  it('should register listeners for a single feature', () => {
    // Arrange
    const featureListeners = [createListener('listener1'), createListener('listenerA')];

    // Act
    useCases.registerShortcutListeners([featureListeners]);

    // Assert
    expect(mockService.registeredStore).not.toBeNull();
    expect(mockService.registeredStore!.getListener('listener1')).toBeDefined();
    expect(mockService.registeredStore!.getListener('listenerA')).toBeDefined();
  });

  it('should register aggregated listeners from multiple features', () => {
    // Arrange
    const feature1Listeners = [createListener('f1_l1')];
    const feature2Listeners = [createListener('f2_l1'), createListener('f2_l2')];

    // Act
    useCases.registerShortcutListeners([feature1Listeners, feature2Listeners]);

    // Assert
    expect(mockService.registeredStore).not.toBeNull();
    expect(mockService.registeredStore!.getListener('f1_l1')).toBeDefined();
    expect(mockService.registeredStore!.getListener('f2_l1')).toBeDefined();
    expect(mockService.registeredStore!.getListener('f2_l2')).toBeDefined();
  });

  it('should call service without errors but register no items when input is empty', () => {
    // Arrange
    const emptyListeners: Listener[][] = [];

    // Act
    useCases.registerShortcutListeners(emptyListeners);

    // Assert
    expect(mockService.registeredStore).not.toBeNull();
    const allListeners = Array.from(mockService.registeredStore!.getAllListeners());
    expect(allListeners).toHaveLength(0);
  });
});