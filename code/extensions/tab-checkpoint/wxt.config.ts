import { defineConfig } from "wxt";

import { DependencyProvider } from "./app/dependency-provider";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  manifest: {
    name: "ArcPort - Checkpoint",
    default_locale: "en",
    permissions: [
      "activeTab",
      "tabs",
      "storage",
      "scripting",
      "contextMenus",
      "tabGroups",
    ],
    host_permissions: ["<all_urls>"],
    commands: getCommands(),
  },
  // `pnpm wxt prepare` to generate .wxt/types/imports.d.ts
  /*imports: {
    dirs: ["app/**"],
  },*/
});

function getCommands() {
  const shortcuts = DependencyProvider.getShortcutListeners();

  return Object.fromEntries(
    shortcuts.map((shortcut) => [
      shortcut.name,
      {
        suggested_key: {
          default: shortcut.key.default,
          mac: shortcut.key.mac,
        },
        description: shortcut.description,
      },
    ]),
  );
}
