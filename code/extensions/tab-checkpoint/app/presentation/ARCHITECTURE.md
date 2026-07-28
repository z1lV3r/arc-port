# `/app/presentation` Architecture

The outermost layer responsible for User Interfaces, handling user inputs, browser triggers, and inter-process messaging within the extension.

## Files
- **UI Components (`.tsx`)**: Contains React components like `pop-up.tsx` and `settings.tsx` for visual interfaces.

## Folders
- `/browser-events`: Contains listeners that react to standard browser and extension APIs.
- `/context-menu`: Listeners tied to the browser's right-click context menu.
- `/shortcuts`: Keyboard shortcut handlers.
- `/messages`: Manages internal communication between different extension contexts.
