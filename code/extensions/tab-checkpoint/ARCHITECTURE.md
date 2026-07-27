# Architectural Description: `tab-checkpoint/app`

The `app` module in the `tab-checkpoint` extension follows a strict **Clean Architecture (Hexagonal Architecture)** design pattern. The primary goal is separation of concerns, isolating core business logic from external frameworks (like the Chrome Extension API), UI, and data storage mechanisms. 

Dependencies point inwards: the `presentation` and `infrastructure` layers depend on the `use-cases` and `domain` layers, but not the other way around.

## General Conventions

### File Naming
- **Kebab-case** is strictly used for all file names (e.g., `set-checkpoint-use-cases.ts`, `chrome-storage-checkpoint-repository.ts`).
- **Suffixes** are heavily used to indicate the architectural role of the file (e.g., `*-use-cases.ts`, `*-repository.ts`, `*-listener.ts`).
- **React Components** use the `.tsx` extension for UI elements.
- **Underscore Prefix (`_`)**: Used in some message senders (e.g., `_clear-checkpoint-message-event-sender.ts`) seemingly to differentiate or sort them from listeners within the same directory.

### Class and Interface Naming
- **PascalCase** is used for classes and interfaces, generally mirroring the file name (e.g., file `checkpoint-repository.ts` contains `interface CheckpointRepository`).
- Interfaces do not use an `I` prefix (e.g., `CheckpointRepository` instead of `ICheckpointRepository`).

---

## Top-Level Files

### `dependency-provider.ts`
This is the **Dependency Injection (DI) Container** / IoC root for the application. It acts as the central registry where all interfaces are bound to their concrete implementations. 
- It instantiates repositories, services, use cases, and presentation listeners.
- It enforces the Singleton pattern for these classes, ensuring only one instance of each is shared across the application to manage state and logic efficiently.

---

## Folder Structure and Layer Definitions

### 1. `/domain`
The innermost layer. It defines the core enterprise rules and models. This layer is completely isolated and has **no dependencies** on external frameworks, APIs, or UI.

- **`/interfaces`**: Contains TypeScript definitions (ports) that the domain needs to interact with the outside world. For example, `checkpoint-repository.ts` defines how a checkpoint should be saved or retrieved, without caring whether it's stored in Chrome local storage, sync storage, or an external database.

### 2. `/use-cases`
Contains application-specific business rules. It orchestrates the flow of data between the presentation layer and the domain/infrastructure layers.

- **File Types (`*-use-cases.ts`)**: Classes like `SetCheckpointUseCases` or `ClearCheckpointUseCases`. They receive commands from the presentation layer (e.g., a user clicking a button), interact with interfaces (like `TabsService` or `CheckpointRepository`), and execute the logic required to fulfill the user's request.

### 3. `/infrastructure`
The outermost layer dealing with data persistence and external APIs. This layer implements the interfaces defined in the `domain` layer.

- **File Types (`*-repository.ts` / `*-service.ts`)**: Contains concrete implementations. For instance, `chrome-storage-checkpoint-repository.ts` implements `CheckpointRepository` using the `chrome.storage.local` API.

### 4. `/presentation`
The outermost layer responsible for User Interfaces, handling user inputs, browser triggers, and inter-process messaging within the extension.

- **UI Components (`.tsx`)**: Contains React components like `pop-up.tsx` and `settings.tsx` for visual interfaces.
- **`/browser-events`**: Contains listeners that react to standard browser and extension APIs. 
  - **Conventions:** 
    - **File Naming:** Files are named in kebab-case and describe the event being handled (often prefixed with `on-`) followed by the action taken. (e.g., `on-tab-activated-set-icon.ts`).
    - **Class Naming:** Classes are named in PascalCase, directly matching the filename (e.g., `OnTabActivatedSetIcon`).
    - **Interfaces:** Each subdirectory corresponds to a specific listener interface defined in the domain layer, which the classes inside implement.

  - **`/action-event-listeners`**
    - **Description:** Triggered when the user interacts with the extension's toolbar icon.
    - **Interface Implemented:** `ActionListener`
    - **Files:**
      - `on-click-show-pop-up.ts`: Handles the click event to display the extension popup.
      - `on-click-reset-current-tab-to-checkpoint.ts`: Handles the click event to reset the tab when the default action is configured to do so.

  - **`/extension-event-listeners`**
    - **Description:** Reacts to extension lifecycle events, such as when the extension is first installed or updated.
    - **Interface Implemented:** `ExtensionListener`
    - **Files:**
      - `on-extension-installed-load-default-settings.ts`: Bootstraps the application's default settings when the user installs the extension.

  - **`/settings-event-listeners`**
    - **Description:** Handles changes in user preferences/settings, updating the extension's active behavior (like which menus or actions are shown).
    - **Interface Implemented:** `SettingChangeListener`
    - **Files:**
      - `extension-action-setting.ts`: Updates behavior based on what the user configured the primary extension action to be.
      - `show-context-menu-setting.ts`: Adds or removes context menus based on user preference.

  - **`/storage-event-listeners`**
    - **Description:** Listens for changes in browser storage, allowing the app to react reactively to underlying data changes.
    - **Interface Implemented:** `StorageListener`
    - **Files:**
      - `on-checkpoint-changed.ts`: Listens for data modifications to checkpoints to perform side-effects like updating the tab's icon state.

  - **`/tab-event-listeners`**
    - **Description:** Hooks into the Chrome Tabs API. Contains logic to react when tabs undergo state changes.
    - **Interface Implemented:** `TabEventListener`
    - **Files:**
      - `on-tab-activated-set-icon.ts`: Updates the toolbar icon state when the user switches to a different tab.
      - `on-tab-close-delete-checkpoint.ts`: Cleans up memory/storage by deleting the checkpoint when a tab is closed.
      - `on-tab-create-grouped-set-checkpoint.ts`: Automatically sets a checkpoint when a tab is created within a group.
      - `on-tab-create-pinned-checkpoint.ts`: Automatically sets a checkpoint when a pinned tab is created.
      - `on-tab-pin-set-checkpoint.ts`: Automatically sets a checkpoint when an existing tab is pinned.
      - `on-tab-set-to-group-set-checkpoint.ts`: Automatically sets a checkpoint when a tab is added to a tab group.
- **`/context-menu`**: 
  - **File Types (`*-context-menu-listener.ts`)**: Listeners tied to the browser's right-click context menu. They bridge the gap between a user selecting a context menu item and executing the corresponding Use Case.
- **`/shortcuts`**: 
  - **File Types (`*-shortcut-listener.ts`)**: Keyboard shortcut handlers. They map predefined key combinations to specific Use Cases.
- **`/messages`**: Manages internal communication between different extension contexts (e.g., background service worker communicating with the popup or content scripts). 
  - **Use Case Subdirectories:** The `messages` directory is strictly organized into subdirectories that correspond 1:1 with the application's core Use Cases (e.g., `/clear-checkpoint`, `/set-checkpoint`, `/reset-tab-to-checkpoint`, `/get-checkpoint`). Each subdirectory encapsulates all the messaging infrastructure required to trigger that specific use case remotely.
  - **Senders (`_*-message-event-sender.ts`)**: Wrapper classes (often prefixed with an underscore to group them at the top of the directory) that group all the related operations for a particular Use Case to send messages. For example, `_clear-checkpoint-message-event-sender.ts` has distinct methods like `sendClearCurrentTabCheckpointEventMessage()` and `sendClearTabCheckpointEventMessage(tabId)` to dispatch the respective operations through the browser's messaging API.
  - **Listeners (`*-message-event-listener.ts`)**: Receivers that implement the `MessageEventListener` interface. Each listener class is strictly associated with exactly **one operation** from the Use Case. For example, `ClearCurrentTabCheckpointMessageEventListener` only handles the `clearCurrentTabCheckpoint()` operation, while a separate class `ClearTabCheckpointMessageEventListener` handles the `clearTabCheckpoint(tabId)` operation. When their targeted message payload is received, they invoke the corresponding method on the injected Use Case class.
