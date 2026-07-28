# `/app/domain/interfaces` Architecture

Contains TypeScript definitions (ports) that the domain needs to interact with the outside world.

## Files
- `checkpoint-repository.ts`: Defines how a checkpoint should be saved or retrieved, without caring whether it's stored in Chrome local storage, sync storage, or an external database.
