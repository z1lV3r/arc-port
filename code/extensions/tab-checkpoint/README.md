<div align="center">

![Tab Checkpoint](https://raw.githubusercontent.com/z1lV3r/arc-port/refs/heads/beta/docs/src/public/app/assets/icon/arc-port-128.png)

# Tab Checkpoint

> Set a navigation checkpoint, allowing you to return to a specific page instantly whenever you need a fresh restart.

[![Official site](https://img.shields.io/badge/Official_site-grey?logo=github&style=for-the-badge)](https://z1lv3r.github.io/arc-port/) [![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-grey?logo=chromewebstore&style=for-the-badge)](https://chromewebstore.google.com/detail/arc-port/kajmnfhpmkimleehomeioondgfcjjnbp)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[![Ko-fi](https://img.shields.io/badge/Ko--fi-grey?logo=ko-fi&style=for-the-badge)](https://ko-fi.com/Y8Y21T3HAL)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-grey?logo=buy-me-a-coffee&style=for-the-badge)](https://www.buymeacoffee.com/z1lV3r)
[![Thanks.dev](https://img.shields.io/badge/Thanks.dev-grey?logo=devbox&style=for-the-badge)](https://thanks.dev/u/z1lv3r)
[![Product Hunt](https://img.shields.io/badge/Product_Hunt-grey?logo=producthunt&style=for-the-badge)](https://www.producthunt.com/products/arc-port)
</div>

## ✨ Features

- **Set checkpoint** — Save the current page URL as the tab's checkpoint.
- **Reset to checkpoint** — Navigate the tab back to its saved checkpoint URL instantly.
- **Reset or close** — Reset to the checkpoint if the current URL differs; otherwise close the tab.
- **Clear checkpoint** — Remove the saved checkpoint from a tab.
- **Auto-checkpoint on pin/group** — Automatically sets a checkpoint when a tab is pinned or added to a tab group.
- **Context menu integration** — Access all checkpoint actions from the right-click context menu (configurable).
- **Extension icon indicator** — The extension icon updates to reflect whether the active tab has a checkpoint set.
- **Configurable click action** — Choose whether clicking the extension icon shows the popup or resets the tab directly.
- **Popup UI** — View, copy, reset, set, and clear the checkpoint from a compact popup.
- **Options page** — Manage settings, customize shortcuts, toggle context menu, and choose the click action.

## ⌨️ Keyboard Shortcuts

| Action                       | Windows / Linux    | macOS              |
| ---------------------------- | ------------------ | ------------------ |
| Set checkpoint               | `Alt+Shift+S`      | `Option+Shift+S`   |
| Clear checkpoint             | `Alt+Shift+K`      | `Option+Shift+K`   |
| Reset to checkpoint          | `Alt+Shift+R`      | `Option+Shift+R`   |
| Reset or close to checkpoint | `Alt+Shift+D`      | `Option+Shift+D`   |

> Shortcuts can be customized from the extension's **Settings** page or via `chrome://extensions/shortcuts`.

## 🔒 Permissions

| Permission       | Reason                                                             |
| ---------------- | ------------------------------------------------------------------ |
| `activeTab`      | Access the currently active tab to read and set its URL.           |
| `tabs`           | Query and manage tabs (create, close, detect pin/group changes).   |
| `storage`        | Persist checkpoints and settings via Chrome storage.               |
| `scripting`      | Interact with tab content when performing checkpoint operations.   |
| `contextMenus`   | Register right-click context menu entries.                         |
| `tabGroups`      | Detect when a tab is added to a group to auto-set a checkpoint.    |
| `<all_urls>`     | Required host permission for tab URL access across all sites.      |

## 🏗️ Architecture

The extension follows a **Clean Architecture** pattern with clear separation of concerns:

```
app/
├── domain/interfaces/    # Core contracts (CheckpointRepository)
├── use-cases/            # Business logic
├── infrastructure/       # Chrome Storage implementation
├── presentation/         # UI components, event listeners, messages
│   ├── pop-up.tsx        # Popup React component
│   ├── settings.tsx      # Options page React component
│   ├── browser-events/   # Tab, extension, storage, action & settings listeners
│   ├── context-menu/     # Context menu item listeners
│   ├── messages/         # Message passing (sender/listener pairs)
│   └── shortcuts/        # Keyboard shortcut listeners
└── dependency-provider.ts  # Singleton DI container
```

### Entrypoints

| Entrypoint    | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `background/` | Service worker — registers all listeners and event handlers.  |
| `popup/`      | Extension popup — displays the checkpoint UI for the tab.     |
| `options/`    | Options page — extension settings and shortcut configuration. |

## 🛠️ Tech Stack

- [WXT](https://wxt.dev/) — Web Extension framework
- [React 19](https://react.dev/) — UI rendering
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS
- [Lucide React](https://lucide.dev/) — Icon library
- [Playwright](https://playwright.dev/) — End-to-end testing
- [@wxt-dev/i18n](https://wxt.dev/guide/i18n.html) — Internationalization
- [@repo/shared](../../packages/) — Shared domain models, services, and UI components

## 📥 Manual Installation

1. Download the latest `tab-checkpoint.zip` from the [Releases page](https://github.com/z1lV3r/arc-port/releases/latest).
2. Unzip the file.
3. In Chrome, navigate to `chrome://extensions`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the unzipped `dist` folder.

## 💻 Development

### Prerequisites

- [Node.js](https://nodejs.org/) v24+
- [pnpm](https://pnpm.io/)

### Setup

```bash
# From the repository root
cd code
pnpm install
```

### Available Scripts

Run these from the `code/extensions/tab-checkpoint` directory:

```bash
# Start dev mode with hot-reload
pnpm dev

# Build the extension (outputs to .output/)
pnpm build

# Package as .zip for distribution
pnpm zip

# Type-check without emitting
pnpm compile

# Run end-to-end tests
pnpm e2e
```
