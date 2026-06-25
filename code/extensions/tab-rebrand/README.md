<div align="center">

![Tab Rebrand](https://raw.githubusercontent.com/z1lV3r/arc-port/refs/heads/beta/docs/src/public/app/assets/icon/arc-port-128.png)

# Tab Rebrand

> Set a custom tab name and icon, allowing you to identify tabs at a glance.

[![Official site](https://img.shields.io/badge/Official_site-grey?logo=github&style=for-the-badge)](https://z1lv3r.github.io/arc-port/) [![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-grey?logo=chromewebstore&style=for-the-badge)](https://chromewebstore.google.com/detail/arc-port/kajmnfhpmkimleehomeioondgfcjjnbp)

[![License: FSL-1.1-MIT](https://img.shields.io/badge/License-FSL--1.1--MIT-blue.svg)](LICENSE)

[![Ko-fi](https://img.shields.io/badge/Ko--fi-grey?logo=ko-fi&style=for-the-badge)](https://ko-fi.com/Y8Y21T3HAL)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-grey?logo=buy-me-a-coffee&style=for-the-badge)](https://www.buymeacoffee.com/z1lV3r)
[![Thanks.dev](https://img.shields.io/badge/Thanks.dev-grey?logo=devbox&style=for-the-badge)](https://thanks.dev/u/z1lv3r)
[![Product Hunt](https://img.shields.io/badge/Product_Hunt-grey?logo=producthunt&style=for-the-badge)](https://www.producthunt.com/products/arc-port)
</div>

## ✨ Features

- **Set custom tab name** — Type a custom name for the current tab and press Enter to apply it.
- **Set custom tab icon** — Pick an emoji from the built-in emoji picker to replace the tab's favicon.
- **Clear custom tab name** — Remove the custom name and restore the original tab title.
- **Clear custom tab icon** — Remove the custom icon and restore the original favicon.
- **Auto-cleanup on close** — Custom names and icons are automatically cleared when a tab is closed.
- **Context menu integration** — Access the name and icon editors from the right-click context menu (configurable).
- **Configurable click action** — Choose whether clicking the extension icon shows the popup or performs another action.
- **Popup UI** — View, set, and clear the custom name and icon from a compact popup with an inline emoji picker.
- **Options page** — Manage settings, customize shortcuts, toggle context menu, and choose the click action.

## ⌨️ Keyboard Shortcuts

| Action                   | Windows / Linux | macOS            |
| ------------------------ | --------------- | ---------------- |
| Edit custom tab name     | `Alt+Shift+E`   | `Option+Shift+E` |
| Edit custom tab icon     | `Alt+Shift+I`   | `Option+Shift+I` |

> Shortcuts can be customized from `chrome://extensions/shortcuts`.

## 🔒 Permissions

| Permission       | Reason                                                             |
| ---------------- | ------------------------------------------------------------------ |
| `activeTab`      | Access the currently active tab to read and update its title/icon. |
| `tabs`           | Query and manage tabs (detect close events to auto-cleanup).       |
| `storage`        | Persist custom names, icons, and settings via Chrome storage.      |
| `scripting`      | Inject content scripts to apply custom names and icons to tabs.    |
| `contextMenus`   | Register right-click context menu entries.                         |
| `tabGroups`      | Detect tab group membership for context-aware behavior.            |
| `<all_urls>`     | Required host permission for tab content access across all sites.  |

## 🏗️ Architecture

The extension follows a **Clean Architecture** pattern with clear separation of concerns:

```
app/
├── domain/interfaces/    # Core contracts (CustomNameRepository, CustomIconRepository, etc.)
├── use-cases/            # Business logic
├── infrastructure/       # Chrome Storage implementation
├── presentation/         # UI components, event listeners, messages
│   ├── pop-up.tsx        # Popup React component with inline emoji picker
│   ├── settings.tsx      # Options page React component
│   ├── browser-events/   # Tab, extension, settings & action listeners
│   ├── context-menu/     # Context menu item listeners
│   ├── messages/         # Message passing (sender/listener pairs)
│   └── shortcuts/        # Keyboard shortcut listeners
└── dependency-provider.ts  # Singleton DI container
```

### Entrypoints

| Entrypoint    | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `background/` | Service worker — registers all listeners and event handlers.  |
| `popup/`      | Extension popup — displays the rebrand UI for the tab.        |
| `options/`    | Options page — extension settings and shortcut configuration. |

## 🛠️ Tech Stack

- [WXT](https://wxt.dev/) — Web Extension framework
- [React 19](https://react.dev/) — UI rendering
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS
- [Lucide React](https://lucide.dev/) — Icon library
- [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react) — Emoji picker component
- [Playwright](https://playwright.dev/) — End-to-end testing
- [@wxt-dev/i18n](https://wxt.dev/guide/i18n.html) — Internationalization
- [@repo/shared](../../packages/) — Shared domain models, services, and UI components

## 📥 Manual Installation

1. Download the latest `tab-rebrand.zip` from the [Releases page](https://github.com/z1lV3r/arc-port/releases/latest).
2. Unzip the file.
3. In Chrome, navigate to `chrome://extensions`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the unzipped folder.

## 💻 Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/)

### Setup

```bash
# From the repository root
cd code
pnpm install
```

### Available Scripts

Run these from the `code/extensions/tab-rebrand` directory:

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
