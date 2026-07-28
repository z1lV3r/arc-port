# Architectural Description: `tab-checkpoint`

The `tab-checkpoint` extension is built on top of the **WXT** (Web Extension Framework) and is designed using a strict **Clean Architecture (Hexagonal Architecture)** pattern to decouple the core business logic from UI frameworks and Chrome Extension APIs.

## General Conventions

### File Naming
- **Kebab-case** is strictly used for all file names (e.g., `set-checkpoint-use-cases.ts`, `chrome-storage-checkpoint-repository.ts`).
- **Suffixes** indicate the architectural role of the file (e.g., `*-use-cases.ts`, `*-repository.ts`, `*-listener.ts`, `*-provider.ts`).
- **React Components** use the `.tsx` extension for UI elements.
- **Underscore Prefix (`_`)**: Used in message senders (e.g., `_clear-checkpoint-message-event-sender.ts`) to visually group and differentiate them from listeners within the same directory.

### Class and Interface Naming
- **PascalCase** is used for classes and interfaces, generally mirroring the file name (e.g., file `checkpoint-repository.ts` contains `interface CheckpointRepository`).
- Interfaces do not use an `I` prefix (e.g., `CheckpointRepository` instead of `ICheckpointRepository`).

---

## Top-Level Files and Configurations

The root directory contains configuration files necessary for building, bundling, and testing the extension:
- **`wxt.config.ts`**: The core configuration file for the WXT framework. It defines the extension's manifest (permissions, background scripts, commands, host permissions, etc.).
- **`playwright.config.ts`**: Configuration for the end-to-end testing suite using Playwright.
- **`package.json`**: Standard Node.js package definition outlining dependencies and NPM scripts.
- **`tsconfig.json` / `postcss.config.js`**: TypeScript and CSS configuration files.

---

## Folder Structure and Layer Definitions

### 1. `/app`
This directory holds the primary **business logic and clean architecture layers** for the extension. Dependencies point inwards: `presentation` and `infrastructure` depend on `use-cases` and `domain`, but not the other way around.

- **`dependency-provider.ts`**: The central **Dependency Injection (DI) Container** / IoC root for the application. It acts as the central registry where all interfaces are bound to their concrete implementations. 
  - It instantiates repositories, services, use cases, and presentation listeners.
  - It enforces the Singleton pattern for these classes, ensuring only one instance of each is shared across the application to manage state and logic efficiently.

- **`/domain`**: The innermost layer. It defines the core enterprise rules and models. This layer is completely isolated and has **no dependencies** on external frameworks, APIs, or UI.
  - **`/interfaces`**: Contains TypeScript definitions (ports) that the domain needs to interact with the outside world.
    - **Files:**
      - `checkpoint-repository.ts`: Defines how a checkpoint should be saved or retrieved, without caring whether it's stored in Chrome local storage, sync storage, or an external database.

- **`/use-cases`**: Contains application-specific business rules. It orchestrates the flow of data between the presentation layer and the domain/infrastructure layers.
  - **File Types (`*-use-cases.ts`)**: Classes that receive commands from the presentation layer (e.g., a user clicking a button), interact with interfaces (like `TabsService` or `CheckpointRepository`), and execute the logic required to fulfill the user's request.
  - **Files:**
    - `clear-checkpoint-use-cases.ts`: Contains logic for clearing existing checkpoints for one or multiple tabs.
    - `extension-action-setting-use-cases.ts`: Handles the execution flow related to updating or checking the default extension icon click behavior.
    - `get-checkpoint-use-cases.ts`: Manages logic for retrieving one or multiple checkpoints.
    - `reset-tab-to-checkpoint-use-cases.ts`: Contains the core logic to revert a tab's URL to its currently saved checkpoint.
    - `set-checkpoint-use-cases.ts`: Orchestrates the saving of new checkpoints for specific tabs.
    - `show-checkpoint-use-cases.ts`: Connects business logic related to bringing a tab with a checkpoint into focus.
    - `show-context-menu-setting-use-cases.ts`: Handles logic for updating user preferences regarding context menu visibility.

- **`/infrastructure`**: The outermost layer dealing with data persistence and external APIs. This layer implements the interfaces defined in the `domain` layer.
  - **Files (`*-repository.ts` / `*-service.ts`)**: Contains concrete implementations.
    - `chrome-storage-checkpoint-repository.ts`: Implements `CheckpointRepository` using the `chrome.storage.local` API.

- **`/presentation`**: The outermost layer responsible for User Interfaces, handling user inputs, browser triggers, and inter-process messaging within the extension.
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
    - **Description:** Listeners tied to the browser's right-click context menu. They bridge the gap between a user selecting a context menu item and executing the corresponding Use Case.
    - **Files:**
      - `clear-current-tab-checkpoint-context-menu-listener.ts`: Handles the context menu click to clear the active tab's checkpoint.
      - `reset-current-tab-to-checkpoint-context-menu-listener.ts`: Handles the context menu click to reset the active tab to its checkpoint.
      - `set-current-tab-checkpoint-context-menu-listener.ts`: Handles the context menu click to set a checkpoint for the active tab.
      - `show-current-tab-checkpoint-context-menu-listener.ts`: Handles the context menu click to show/focus the tab's current checkpoint.
  - **`/shortcuts`**: 
    - **Description:** Keyboard shortcut handlers. They map predefined key combinations to specific Use Cases.
    - **Files:**
      - `clear-current-tab-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to clear a checkpoint.
      - `reset-current-tab-to-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to reset the tab to its checkpoint.
      - `reset-or-close-current-tab-to-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to reset the tab, or close it if no checkpoint is available.
      - `set-current-tab-checkpoint-shortcut-listener.ts`: Triggered when the user presses the shortcut to set a checkpoint.
  - **`/messages`**: Manages internal communication between different extension contexts (e.g., background service worker communicating with the popup or content scripts). 
    - **Use Case Subdirectories:** The `messages` directory is strictly organized into subdirectories that correspond 1:1 with the application's core Use Cases (e.g., `/clear-checkpoint`, `/set-checkpoint`, `/reset-tab-to-checkpoint`, `/get-checkpoint`). Each subdirectory encapsulates all the messaging infrastructure required to trigger that specific use case remotely.
    - **Senders (`_*-message-event-sender.ts`)**: Wrapper classes (often prefixed with an underscore to group them at the top of the directory) that group all the related operations for a particular Use Case to send messages through the browser's messaging API.
    - **Listeners (`*-message-event-listener.ts`)**: Receivers that implement the `MessageEventListener` interface. Each listener class is strictly associated with exactly **one operation** from the Use Case. When their targeted message payload is received, they invoke the corresponding method on the injected Use Case class.
    - **`/clear-checkpoint`**
      - `_clear-checkpoint-message-event-sender.ts`: Contains methods to send clear checkpoint events.
      - `clear-current-tab-checkpoint-message-event-listener.ts`: Receives requests to clear the current tab's checkpoint.
      - `clear-tab-checkpoint-message-event-listener.ts`: Receives requests to clear a specific tab's checkpoint by ID.
    - **`/get-checkpoint`**
      - `_get-checkpoint-message-event-sender.ts`: Contains methods to send get checkpoint events.
      - `get-current-tab-checkpoint-message-event-listener.ts`: Receives requests to get the current tab's checkpoint.
    - **`/reset-tab-to-checkpoint`**
      - `_reset-tab-to-checkpoint-message-event-sender.ts`: Contains methods to send reset checkpoint events.
      - `reset-current-tab-to-checkpoint-message-event-listener.ts`: Receives requests to reset the current tab.
      - `reset-or-close-current-tab-to-checkpoint-message-event-listener.ts`: Receives requests to reset or close the current tab.
    - **`/set-checkpoint`**
      - `_set-checkpoint-message-event-sender.ts`: Contains methods to send set checkpoint events.
      - `set-current-tab-checkpoint-message-event-listener.ts`: Receives requests to set the current tab's checkpoint.
      - `set-tab-checkpoint-if-unset-message-event-listener.ts`: Receives requests to set a checkpoint only if it's currently unset.

### 2. `/entrypoints`
Required by the **WXT Framework**, this directory defines the actual extension entry points (background scripts, popup HTML, options page) that are bundled into the final extension manifest.

- **`/background`**: The Service Worker entry point. Like the `/app` module, this folder also strictly follows **Clean Architecture**:
  - **`index.ts`**: The initialization file where WXT registers the background script.
  - **`dependency-provider.ts`**: DI Container specifically for background lifecycle listeners and browser services.
  - **`/domain/interfaces`**: Defines interfaces for browser services.
    - **Files:**
      - `browser-context-menu-service.ts`
      - `browser-message-event-service.ts`
      - `browser-shortcut-service.ts`
      - `browser-storage-event-service.ts`
      - `browser-tab-event-service.ts`
  - **`/infrastructure`**: Concrete implementations of browser services utilizing the Chrome Extension APIs.
    - **Files:**
      - `chrome-context-menu-service.ts`
      - `chrome-message-event-service.ts`
      - `chrome-shortcut-service.ts`
      - `chrome-storage-event-service.ts`
      - `chrome-tab-event-service.ts`
  - **`/presentation`**: Providers that register listeners for the background script. These connect the underlying OS/browser event hooks to the application's Use Cases.
    - **Files:**
      - `context-menu-listener-provider.ts`
      - `extension-listener-provider.ts`
      - `message-event-listener-provider.ts`
      - `settings-listener-provider.ts`
      - `shortcut-listener-provider.ts`
      - `storage-listener-provider.ts`
      - `tab-event-listener-provider.ts`
  - **`/use-cases`**: Logic that orchestrates event listener registration via the browser services.
    - **Files:**
      - `context-menu-listener-use-cases.ts`
      - `extension-listener-use-cases.ts`
      - `message-event-listeners-use-cases.ts`
      - `settings-listener-use-cases.ts`
      - `shortcut-listener-use-cases.ts`
      - `storage-listener-use-cases.ts`
      - `tab-event-listener-use-cases.ts`

- **`/options`**: 
  - Contains `options.tsx`, `index.html`, and `style.css` which render the extension's settings/options page.

- **`/popup`**: 
  - Contains `main.tsx`, `index.html`, and `style.css` which render the extension's popup interface when the toolbar icon is clicked.

### 3. `/e2e`
Contains the automated end-to-end testing suite powered by Playwright.

- **`fixtures.ts`**: Defines reusable testing fixtures that setup the environment (like launching the Chrome extension).
- **`/flows`**: Tests that cover full user interaction flows.
  - `happy-path.test.ts`: Covers the standard operation of the extension.
  - **`/edge-cases`**: Tests specific scenarios such as resetting a pinned tab (`reset-pinned-tab.test.ts`), resetting a grouped tab (`reset-first-tab-in-group-tabs.test.ts`), or resetting a standalone tab in a window (`reset-first-tab-in-window.test.ts`).
- **`/integration`**: Tests for specific architecture integrations, mocking dependencies and ensuring listeners fire correctly.
  - **`/context-menu-listeners`**: Checks context menu interactions.
  - **`/shortcut-listeners`**: Checks keyboard shortcut bindings.
  - **`/tab-event-listeners`**: Checks behavior when tabs are created, closed, pinned, or moved to groups.
- **`/test-services`**: Mocking and utility services (like `playwright-browser-message-service.ts`) used to validate extension behavior in a headless browser environment.

### 4. `/locales`
Manages internationalization (i18n).

- **`en.yaml`**: Contains localized string definitions for the English language. WXT's `@wxt-dev/i18n/module` parses this to generate TypeScript types and the standard Chrome `messages.json` file in the final build.

### 5. `/public` and `/assets`
- **`/public/icon`**: Contains all static manifest icons in various resolutions (e.g., `16.png`, `128.png`) and color schemes (`bw/`). These are copied directly to the output folder.
- **`/assets`**: Additional static assets like `react.svg` that might be imported within the source code.

### 6. `/utils`
- Contains shared utility functions (e.g., `alias.ts`) used across different architectural boundaries or testing environments.

---

## Dependency Injection (DI) Specifics

The project uses a **manual Dependency Injection** pattern rather than relying on an external DI library (like TSyringe or InversifyJS). This is centralized in the `DependencyProvider` classes (found in `/app/dependency-provider.ts` and `/entrypoints/background/dependency-provider.ts`).

### How DI is Implemented

1. **Static Singleton Registry**: The `DependencyProvider` is a class with static methods and static private properties for every service, repository, use case, and listener in the application.
2. **Lazy Instantiation**: When a dependency is requested (e.g., `DependencyProvider.getCheckpointRepository()`), the provider checks if the instance already exists in its private static property. If it does, it returns it; if it doesn't, it instantiates it, saves it, and then returns it. This enforces the **Singleton pattern** across the app context.
3. **Constructor Injection**: When a higher-level class (like a Use Case) requires dependencies (like a Repository), they are passed into its constructor. The `DependencyProvider` handles wiring these together during instantiation.

### How to Register a New Service or Use Case

When you create a new class that needs to be injected, follow these steps to register it:

1. **Define the Property and Getter**: Open the relevant `dependency-provider.ts` file and add a private static property and a public static getter method for your new class.
2. **Instantiate and Inject**: Inside the getter method, implement the lazy-loading singleton pattern. If your new class requires its own dependencies in its constructor, call the respective getters for those dependencies from within the provider.
3. **Use the Provider**: In your application code (like a React component or a background listener registry), never instantiate the class directly with `new`. Instead, call `DependencyProvider.getYourNewService()` to retrieve the shared instance.
