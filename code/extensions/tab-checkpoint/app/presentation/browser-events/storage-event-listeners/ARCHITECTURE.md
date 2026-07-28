# `/app/presentation/browser-events/storage-event-listeners` Architecture

**Description:** Listens for changes in browser storage, allowing the app to react reactively to underlying data changes.
**Interface Implemented:** `StorageListener`

## Files
- `on-checkpoint-changed.ts`: Listens for data modifications to checkpoints to perform side-effects like updating the tab's icon state.
