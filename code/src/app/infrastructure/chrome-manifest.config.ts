export default {
  manifest_version: 3,
  name: "Arc Port",
  version: "0.0.0.1",
  description: "Port Arc browser features into chrome",
  icons: {
    "16": "app/assets/icon/arc-port-16.png",
    "48": "app/assets/icon/arc-port-48.png",
    "128": "app/assets/icon/arc-port-128.png",
  },
  action: {
    default_popup: "src/index.html",
  },
  permissions: ["activeTab", "tabs", "storage"],
  background: {
    service_worker: "background.js",
  },
  commands: {
    "set-current-tab-default-url": {
      suggested_key: {
        default: "Ctrl+Shift+D",
        mac: "Command+Shift+D",
      },
      description: "Set current tab default URL",
    },
    "clear-current-tab-default-url": {
      suggested_key: {
        default: "Ctrl+Shift+C",
        mac: "Command+Shift+C",
      },
      description: "Clear current tab default URL",
    },
    "reset-tab-to-default-url": {
      suggested_key: {
        default: "Alt+Shift+D",
        mac: "Option+Shift+D",
      },
      description: "Reset tab to default URL",
    },
  },
};
