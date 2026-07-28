# `/app/presentation/shortcuts` Architecture

**Description:** Keyboard shortcut handlers. They map predefined key combinations to specific Use Cases.

## Files
- `clear-current-tab-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to clear a checkpoint.
- `reset-current-tab-to-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to reset the tab to its checkpoint.
- `reset-or-close-current-tab-to-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to reset the tab, or close it if no checkpoint is available.
- `set-current-tab-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to set a checkpoint.
