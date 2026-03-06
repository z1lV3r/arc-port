export default {
  manifest_version: 3,
  name: "Arc Port",
  version: "1.0.0",
  description: "Port Arc browser features into chrome",
  icons: {
    "16": "app/assets/icon/arc-port-16.png",
    "48": "app/assets/icon/arc-port-48.png",
    "128": "app/assets/icon/arc-port-128.png",
  },
  action: {
    default_popup: "src/index.html",
  },
  options_ui: {
    page: "src/options.html",
    open_in_tab: true,
  },
  permissions: ["activeTab", "tabs", "storage", "scripting", "contextMenus"],
  host_permissions: ["<all_urls>"],
  background: {
    service_worker: "background.js",
  },
  web_accessible_resources: [
    {
      resources: ["app/assets/icon/arc-port-48.png"],
      matches: ["<all_urls>"],
    },
  ],
};
