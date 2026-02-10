# Tests
## App - Black Box Testing Approach

> **Testing Philosophy**: These tests treat components as black boxes, validating observable behaviors and outputs based on inputs without checking internal implementation details.

### Presentation Layer - Background Services

#### Context Menu Listener Provider
**File:** `code/src/app/presentation/background/context-menu-listener-provider.ts`

When `registerFeaturesContextMenuListeners` is called given the browser has no existing context menus
- the browser should have context menu items registered for the default URL feature.
- the registered context menus should include items for set, clear, and reset operations.

When `registerFeaturesContextMenuListeners` is called multiple times
- the context menu items should remain consistent without duplication.
- the browser should maintain only one set of context menu items per feature.

#### Shortcut Listener Provider
**File:** `code/src/app/presentation/background/shortcut-listener-provider.ts`

When `registerFeaturesShortcutListeners` is called given the browser has no existing shortcuts
- the browser should respond to the default URL feature shortcuts.
- pressing a registered shortcut should trigger its associated functionality.

When `registerFeaturesShortcutListeners` is called multiple times
- the shortcuts should remain integration without duplication.
- each shortcut should trigger its functionality only once per keystroke.

#### Tab Event Listener Provider
**File:** `code/src/app/presentation/background/tab-event-listener-provider.ts`

When `registerFeaturesOnCreateTabEventListeners` is called given the browser has no tab create listeners
- creating a new tab should trigger the default URL feature's create tab handler.

When `registerFeaturesOnUpdateTabEventListeners` is called given the browser has no tab update listeners
- updating a tab should trigger the default URL feature's update tab handler.

When `registerFeaturesOnCloseTabEventListeners` is called given the browser has no tab close listeners
- closing a tab should trigger the default URL feature's close tab handler.

When all tab event listeners are registered and a tab lifecycle occurs
- creating a tab should execute the registered create handlers.
- updating the tab should execute the registered update handlers.
- closing the tab should execute the registered close handlers.

### AI Test Generation Prompts

#### Black Box Testing Principles
**IMPORTANT**: Use black-box testing approach - test only observable behaviors and outputs, not internal implementation details.

#### For Provider Classes
Generate black-box unit tests for `[ProviderClassName]` in `[file-path]` using Vitest. The tests should:

**Setup:**
1. Create test doubles that capture observable behavior (e.g., track what gets registered in the browser).
2. Mock only external dependencies (browser APIs), not internal method calls.
3. Set up test scenarios that reflect real-world usage.

**Test Focus:**
1. **Input**: Call the register method with various scenarios.
2. **Output**: Verify the observable result (what gets registered in the browser).
3. **DO NOT**: Check if internal methods were called or how many times.
4. **DO**: Verify the end state or behavior that a user/system would observe.

**Example Test Structure:**
```javascript
describe('ContextMenuListenerProvider', () => {
  it('should register context menu items in the browser when called', () => {
    // Arrange: Set up browser mock to capture registrations
    const browserMock = createBrowserMock();
    const provider = new ContextMenuListenerProvider(/* with mocked dependencies */);
    
    // Act: Execute the method
    provider.registerFeaturesContextMenuListeners();
    
    // Assert: Verify observable outcome (not method calls)
    expect(browserMock.getRegisteredContextMenus()).toContainEqual(
      expect.objectContaining({ title: expect.stringContaining('Default URL') })
    );
  });
});
```

**Edge Cases:**
- Test with normal scenarios (happy path).
- Test behavior when called multiple times.
- Verify no observable side effects or state pollution.

#### For Use Cases
Generate black-box unit tests for `[UseCaseClassName]` in `[file-path]` using Vitest. The tests should:

**Setup:**
1. Mock the browser service to capture what would be the final observable behavior.
2. Focus on what gets passed to the browser, not how it's constructed internally.

**Test Focus:**
1. **Input**: Call the use case method with various listener configurations.
2. **Output**: Verify that the correct behavior is registered with the browser service.
3. **DO NOT**: Verify that ListenersStore was created or that specific internal methods were called.
4. **DO**: Verify that the browser service receives the correct aggregated listeners.

**Example Test Structure:**
```javascript
describe('TabEventListenerUseCase', () => {
  it('should register listeners with browser service when given listener arrays', () => {
    // Arrange
    const mockBrowserService = {
      registerOnCreateTabEventListeners: vi.fn()
    };
    const useCase = new TabEventListenerUseCase(mockBrowserService);
    const mockListeners = [[{ execute: vi.fn() }]];
    
    // Act
    useCase.registerOnCreateTabEventListeners(mockListeners);
    
    // Assert: Verify the browser service received listeners (not how they were packaged)
    expect(mockBrowserService.registerOnCreateTabEventListeners).toHaveBeenCalled();
    const receivedStore = mockBrowserService.registerOnCreateTabEventListeners.mock.calls[0][0];
    // Test that the store has the expected listeners when queried
    expect(receivedStore.hasListeners()).toBe(true);
  });
});
```

**Edge Cases:**
- Empty arrays should result in an empty or no-op registration.
- Multiple arrays should aggregate all listeners.
- Invalid input should be handled gracefully.

#### General Black Box Testing Guidelines

**Core Principles:**
1. **Test behavior, not implementation**: Focus on what the component does, not how it does it.
2. **Observable outputs only**: Verify return values, state changes, or effects on external systems.
3. **No internal verification**: Don't test if method X called method Y internally.
4. **User perspective**: Think from the perspective of the component's consumer.

**Best Practices:**
- Use Vitest as the testing framework.
- Mock external dependencies (browser APIs, external services) but not internal methods.
- Follow the Arrange-Act-Assert pattern.
- Test inputs and outputs at the public API boundary.
- Use descriptive test names: "When [scenario], should [observable behavior]".
- Group related tests using `describe` blocks.
- Ensure tests are isolated and don't share state.
- Focus on contract testing: does it do what it promises?

**What to AVOID:**
- ❌ `expect(internalMethod).toHaveBeenCalled()`
- ❌ `expect(dependency.method).toHaveBeenCalledTimes(3)`
- ❌ Spying on constructor calls
- ❌ Testing implementation details like private methods

**What to TEST:**
- ✅ Final state or output after method execution
- ✅ Observable behavior in external systems (browser APIs)
- ✅ Return values and their structure
- ✅ Error handling and edge cases
- ✅ Public API contract compliance
