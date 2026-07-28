# Architectural Description: `tab-checkpoint`

The `tab-checkpoint` extension is built on top of the **WXT** (Web Extension Framework) and is designed using a strict **Clean Architecture (Hexagonal Architecture)** pattern to decouple the core business logic from UI frameworks and Chrome Extension APIs.

## General Conventions

### File Naming
- **Kebab-case** is strictly used for all file names (e.g., `set-checkpoint-use-cases.ts`, `chrome-storage-checkpoint-repository.ts`).
- **Suffixes** indicate the architectural role of the file (e.g., `*-use-cases.ts`, `*-repository.ts`, `*-listener.ts`, `*-provider.ts`).
- **React Components** use the `.tsx` extension for UI elements.

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

## Folder Structure

The project has been split into individual `ARCHITECTURE.md` files for each directory to maintain focus and detail. Below are the primary top-level directories. See the respective `ARCHITECTURE.md` files inside them for detailed layer definitions and file descriptions.

### `/app`
This directory holds the primary **business logic and clean architecture layers** for the extension. Dependencies point inwards: `presentation` and `infrastructure` depend on `use-cases` and `domain`, but not the other way around.

### `/entrypoints`
Required by the **WXT Framework**, this directory defines the actual extension entry points (background scripts, popup HTML, options page) that are bundled into the final extension manifest.

### `/e2e`
Contains the automated end-to-end testing suite powered by Playwright.

### `/locales`
Manages internationalization (i18n).

### `/public` and `/assets`
Contains static assets and icons used by the extension.

### `/utils`
Contains shared utility functions used across different architectural boundaries or testing environments.

