# `/entrypoints/background` Architecture

The Service Worker entry point. Like the `/app` module, this folder also strictly follows **Clean Architecture**.

## Files
- **`index.ts`**: The initialization file where WXT registers the background script.
- **`dependency-provider.ts`**: DI Container specifically for background lifecycle listeners and browser services.

## Folders
- `/domain/interfaces`: Defines interfaces for browser services.
- `/infrastructure`: Concrete implementations of browser services utilizing the Chrome Extension APIs.
- `/presentation`: Providers that register listeners for the background script. These connect the underlying OS/browser event hooks to the application's Use Cases.
- `/use-cases`: Logic that orchestrates event listener registration via the browser services.
