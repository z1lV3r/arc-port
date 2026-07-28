# `/app/presentation/browser-events/tab-event-listeners` Architecture

**Description:** Hooks into the Chrome Tabs API. Contains logic to react when tabs undergo state changes.
**Interface Implemented:** `TabEventListener`

## Files
- `on-tab-activated-set-icon.ts`: Updates the toolbar icon state when the user switches to a different tab.
- `on-tab-close-delete-checkpoint.ts`: Cleans up memory/storage by deleting the checkpoint when a tab is closed.
- `on-tab-create-grouped-set-checkpoint.ts`: Automatically sets a checkpoint when a tab is created within a group.
- `on-tab-create-pinned-checkpoint.ts`: Automatically sets a checkpoint when a pinned tab is created.
- `on-tab-pin-set-checkpoint.ts`: Automatically sets a checkpoint when an existing tab is pinned.
- `on-tab-set-to-group-set-checkpoint.ts`: Automatically sets a checkpoint when a tab is added to a tab group.
