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
  permissions: ["activeTab", "tabs", "storage", "scripting"],
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
