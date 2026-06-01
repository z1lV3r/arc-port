# Arc Port Monorepo

This directory contains the codebase for **Arc Port**, a Google Chrome extension that brings the best Arc browser features to Chrome. The repository is structured as a monorepo powered by [Turborepo](https://turbo.build/) and [pnpm workspaces](https://pnpm.io/workspaces).

## 📁 Monorepo Structure

```text
code/
├── extensions/
│   └── tab-checkpoint/      # The WXT + React Chrome extension (named "ext-1")
└── shared/
    ├── ui/                  # Shared React component library ("@repo/ui")
    ├── eslint-config/       # Shared ESLint configuration ("@repo/eslint-config")
    └── typescript-config/   # Shared TypeScript configuration ("@repo/typescript-config")
```

### Packages & Apps

- **[tab-checkpoint](file:///c:/Users/hvill/Proyectos/arc-port/code/extensions/tab-checkpoint)** (`ext-1`): A browser extension built using [WXT](https://wxt.dev/) and [React](https://react.dev/).
- **[ui](file:///c:/Users/hvill/Proyectos/arc-port/code/shared/ui)** (`@repo/ui`): A shared React component library containing UI primitives used by the extension.
- **[eslint-config](file:///c:/Users/hvill/Proyectos/arc-port/code/shared/eslint-config)** (`@repo/eslint-config`): Shared ESLint configurations.
- **[typescript-config](file:///c:/Users/hvill/Proyectos/arc-port/code/shared/typescript-config)** (`@repo/typescript-config`): Shared TypeScript config profiles.

---

## 🛠️ Development

> [!NOTE]
> This project uses `pnpm` as its package manager. Please ensure you have [pnpm](https://pnpm.io/) installed.

### Setup

Install all dependencies from the `code` directory:

```sh
pnpm install
```

### Available Scripts

You can run these scripts from the root of the `code` directory:

| Script            | Command            | Description                                                               |
| :---------------- | :----------------- | :------------------------------------------------------------------------ |
| **`dev`**         | `pnpm dev`         | Starts the development server for WXT (tab-checkpoint) with hot reloading |
| **`build`**       | `pnpm build`       | Builds all packages and compile the WXT extension for production          |
| **`lint`**        | `pnpm lint`        | Runs ESLint across all projects in the workspace                          |
| **`format`**      | `pnpm format`      | Formats all TS, TSX, and MD files using Prettier                          |
| **`check-types`** | `pnpm check-types` | Performs static TypeScript type checking across all packages              |

---

## 🚀 Running the Extension Locally

1. **Start the dev server**:

   ```sh
   pnpm dev
   ```

   This will start the WXT dev server, which compiles the extension and places the output in `code/extensions/tab-checkpoint/.output/chrome-mv3`.

2. **Load in Chrome**:
   - Open Google Chrome and go to `chrome://extensions`.
   - Enable **Developer mode** (toggle in the top-right corner).
   - Click **Load unpacked** (top-left).
   - Select the `code/extensions/tab-checkpoint/.output/chrome-mv3` folder.

---

## 🎯 Filtering Tasks

With Turborepo, you can run tasks for specific packages using the `--filter` flag. For example:

```sh
# Only build the tab-checkpoint extension
pnpm build --filter=ext-1

# Run type check only on the shared UI library
pnpm check-types --filter=@repo/ui
```

For more information, refer to the [Turborepo Filtering Documentation](https://turbo.build/repo/docs/core-concepts/monorepos/filtering).
