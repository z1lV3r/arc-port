import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  manifest: {
    name: "ArcPort - Checkpoint",
    default_locale: 'en',
    permissions: ["activeTab", "tabs", "storage", "scripting", "contextMenus", "tabGroups"],
    host_permissions: ["<all_urls>"],
  },
  // `pnpm wxt prepare` to generate .wxt/types/imports.d.ts
  imports: {
    dirs: [
      'app/**'
    ],
  },
});
