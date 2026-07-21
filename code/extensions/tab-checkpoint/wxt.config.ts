import { defineConfig } from "wxt";

import { DependencyProvider } from "./app/dependency-provider";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  manifest: {
    name: "__MSG_extension_full_name__",
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
    web_accessible_resources: [
      {
        resources: ["icon/*"],
        matches: ["<all_urls>"],
      },
    ],
  },
  webExt: {
    // Open specific URLs automatically when the dev browser launches
    startUrls: ["https://example.com"],
  },
  // `pnpm wxt prepare` to generate .wxt/types/imports.d.ts
});

function getCommands() {
  const shortcuts = DependencyProvider.getShortcutListeners();
  const commands: Record<string, any> = {};

  for (let i = 0; i < shortcuts.length; i++) {
    const shortcut = shortcuts[i];
    const manifestDescription = `__MSG_${shortcut.description.replace(/\./g, "_")}__`;

    if (i < 4) {
      commands[shortcut.name] = {
        suggested_key: {
          default: shortcut.key.default,
          mac: shortcut.key.mac,
        },
        description: manifestDescription,
      };
    } else {
      commands[shortcut.name] = {
        description: manifestDescription,
      };
    }
  }

  return commands;
}