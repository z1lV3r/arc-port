import type { BrowserService } from "../domain/interfaces/browser-service";
import type { Shortcut } from "../domain/shortcut";

export default class ChromeBrowserService implements BrowserService {
  async registerShortcuts(shortcuts: Map<string, Shortcut>) {
    chrome.commands.onCommand.addListener(async (shortcutName) => {
      const shortcut = shortcuts.get(shortcutName);
      if (shortcut) {
        await shortcut.command();

        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tab?.id) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: showToast,
            args: [`${shortcut.description}`],
          });
        }
      }
    });
  }
}

function showToast(message: string) {
  // Remove existing toasts
  const existing = document.getElementById("arc-port-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "arc-port-toast";

  // Icon
  // Icon
  const iconUrl = chrome.runtime.getURL("app/assets/icon/arc-port-48.png");
  const icon = `<img src="${iconUrl}" width="20" height="20" style="margin-right:8px; display:inline-block; vertical-align:middle; border-radius: 4px;" />`;

  toast.innerHTML = `<div style="display:flex; align-items:center;">${icon}<span>${message}</span></div>`;

  // Sonner-like Styles
  toast.style.cssText = `
              position: fixed;
              top: 24px;
              right: 24px;
              background: #1e1e1e;
              color: #ededed;
              border: 1px solid #333;
              padding: 14px 20px;
              border-radius: 8px;
              z-index: 2147483647;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              font-size: 13px;
              font-weight: 500;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              display: flex;
              align-items: center;
              gap: 8px;
              opacity: 0;
              transform: translateY(16px) scale(0.95);
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              pointer-events: none;
            `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0) scale(1)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px) scale(0.95)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
