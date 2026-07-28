# `/app/presentation/context-menu` Architecture

**Description:** Listeners tied to the browser's right-click context menu. They bridge the gap between a user selecting a context menu item and executing the corresponding Use Case.

## Files
- `clear-current-tab-checkpoint-context-menu-listener.ts`: Handles the context menu click to clear the active tab's checkpoint.
- `reset-current-tab-to-checkpoint-context-menu-listener.ts`: Handles the context menu click to reset the active tab to its checkpoint.
- `set-current-tab-checkpoint-context-menu-listener.ts`: Handles the context menu click to set a checkpoint for the active tab.
- `show-current-tab-checkpoint-context-menu-listener.ts`: Handles the context menu click to show/focus the tab's current checkpoint.
