import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContextMenuListenerUseCases } from '@/app/use-cases/context-menu-listener-use-cases';
import type { Listener } from '@/shared/domain/models/listener';
import { MockBrowserContextMenuService } from '../../infrastructure/mock-browser-context-menu-service';
import { ContextMenuListener } from '@/shared/domain/models/context-menu-listener';

describe('ContextMenuListenerUseCases - registerContextMenuListeners', () => {
  let useCases: ContextMenuListenerUseCases;
  let mockService: MockBrowserContextMenuService;

  beforeEach(() => {
    mockService = new MockBrowserContextMenuService();
    useCases = new ContextMenuListenerUseCases(mockService);
  });

  const createListener = (name: string): ContextMenuListener => ({
    name,
    description: `Description for ${name}`,
    command: vi.fn().mockResolvedValue(undefined),
  });

  it('should register listeners for a single feature', () => {
    // Arrange
    const featureListeners = [createListener('listener1'), createListener('listenerA')];
    
    // Act
    useCases.registerContextMenuListeners([featureListeners]);
    
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
    useCases.registerContextMenuListeners([feature1Listeners, feature2Listeners]);
    
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
    useCases.registerContextMenuListeners(emptyListeners);
    
    // Assert
    expect(mockService.registeredStore).not.toBeNull();

    const allListeners = Array.from(mockService.registeredStore!.getAllListeners());
    expect(allListeners).toHaveLength(0);
  });

});