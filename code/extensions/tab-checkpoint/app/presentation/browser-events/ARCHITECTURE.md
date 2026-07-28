# `/app/presentation/browser-events` Architecture

Contains listeners that react to standard browser and extension APIs. 

## Conventions
- **File Naming:** Files are named in kebab-case and describe the event being handled (often prefixed with `on-`) followed by the action taken. (e.g., `on-tab-activated-set-icon.ts`).
- **Class Naming:** Classes are named in PascalCase, directly matching the filename (e.g., `OnTabActivatedSetIcon`).
- **Interfaces:** Each subdirectory corresponds to a specific listener interface defined in the domain layer, which the classes inside implement.

## Folders
- `/action-event-listeners`: Triggered when the user interacts with the extension's toolbar icon.
- `/extension-event-listeners`: Reacts to extension lifecycle events.
- `/settings-event-listeners`: Handles changes in user preferences/settings.
- `/storage-event-listeners`: Listens for changes in browser storage.
- `/tab-event-listeners`: Hooks into the Chrome Tabs API.
