# `/app/infrastructure` Architecture

The outermost layer dealing with data persistence and external APIs. This layer implements the interfaces defined in the `domain` layer.

- **Files (`*-repository.ts` / `*-service.ts`)**: Contains concrete implementations.

## Files
- `chrome-storage-checkpoint-repository.ts`: Implements `CheckpointRepository` using the `chrome.storage.local` API.
