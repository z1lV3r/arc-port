<div align="center">

![Arc Port](https://raw.githubusercontent.com/z1lV3r/arc-port/refs/heads/beta/docs/src/public/app/assets/icon/arc-port-128.png)

# Arc Port

> A Chrome extension suite that bring the best Arc browser features to Google Chrome.

[![Official site](https://img.shields.io/badge/Official_site-grey?logo=github&style=for-the-badge)](https://z1lv3r.github.io/arc-port/) [![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-grey?logo=chromewebstore&style=for-the-badge)](https://chromewebstore.google.com/detail/arc-port/kajmnfhpmkimleehomeioondgfcjjnbp)

[![License: FSL-1.1-MIT](https://img.shields.io/badge/License-FSL--1.1--MIT-blue.svg)](LICENSE)

[![Ko-fi](https://img.shields.io/badge/Ko--fi-grey?logo=ko-fi&style=for-the-badge)](https://ko-fi.com/Y8Y21T3HAL)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-grey?logo=buy-me-a-coffee&style=for-the-badge)](https://www.buymeacoffee.com/z1lV3r)
[![Thanks.dev](https://img.shields.io/badge/Thanks.dev-grey?logo=devbox&style=for-the-badge)](https://thanks.dev/u/z1lv3r)
[![Product Hunt](https://img.shields.io/badge/Product_Hunt-grey?logo=producthunt&style=for-the-badge)](https://www.producthunt.com/products/arc-port)
</div>

## ⚙ Extensions

- ↩️ [Tab Checkpoint](https://z1lv3r.github.io/arc-port/features/checkpoint) — Set a navigation checkpoint, allowing you to return to a specific page instantly whenever you need a fresh restart.
- 🎭 [Tab Rebrand](https://z1lv3r.github.io/arc-port/features/tab-rebrand) — Set a custom tab name and icon, allowing you to identify tabs at a glance.

## 🏗️ Project Structure

This is a **pnpm monorepo** managed with [Turborepo](https://turbo.build/):

```
arc-port/
├── code/                         # Monorepo root
│   ├── extensions/
│   │   ├── tab-checkpoint/       # Tab Checkpoint extension
│   │   └── tab-rebrand/          # Tab Rebrand extension
│   ├── packages/
│   │   ├── shared/               # Shared domain models, services & UI components
│   │   ├── eslint-config/        # Shared ESLint configuration
│   │   └── typescript-config/    # Shared TypeScript configuration
│   ├── turbo.json                # Turborepo task configuration
│   └── pnpm-workspace.yaml      # pnpm workspace definition
└── docs/                         # Documentation site (VitePress)
```

## 🛠️ Tech Stack

- [WXT](https://wxt.dev/) — Web Extension framework
- [React 19](https://react.dev/) — UI rendering
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS
- [Turborepo](https://turbo.build/) — Monorepo build orchestration
- [pnpm](https://pnpm.io/) — Fast, disk-efficient package manager
- [Playwright](https://playwright.dev/) — End-to-end testing
- [VitePress](https://vitepress.dev/) — Documentation site

## 📥 Manual Installation

1. Download the latest extension `.zip` from the [Releases page](https://github.com/z1lV3r/arc-port/releases/latest).
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

Run these from the `code/` directory:

```bash
# Build all extensions and packages
pnpm build

# Start dev mode with hot-reload (all extensions)
pnpm dev

# Lint all packages
pnpm lint

# Type-check all packages
pnpm check-types

# Format code with Prettier
pnpm format
```

> Each extension also has its own scripts (e.g. `pnpm dev`, `pnpm build`, `pnpm e2e`). See the individual extension READMEs for details.

### Running the Docs Locally

```bash
cd docs
pnpm install
pnpm docs:dev
```

---

## 📄 License

Functional Source License, Version 1.1, MIT Future License © [Hugo Villanueva Jimenez](LICENSE)

