import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import { Tab } from "@/shared/domain/models/tab";

export class ChromeTabsService implements BrowserTabsService {
  async getCurrentTab(): Promise<Tab> {
    if (!chrome || !chrome.tabs) {
      return new Tab("", "", 0);
    }
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tabs || !tabs[0]) {
      return new Tab("", "", 0);
    }
    return new Tab(
      tabs[0].id?.toString() || "",
      tabs[0].url || "",
      tabs[0].index,
      tabs[0].groupId,
      tabs[0].pinned
    );
  }

  async getTab(id: string): Promise<Tab> {
    if (!chrome || !chrome.tabs) {
      return new Tab("", "", 0);
    }
    const tab = await chrome.tabs.get(parseInt(id));
    if (!tab) {
      return new Tab("", "", 0);
    }
    const url = tab.url || tab.pendingUrl || "";
    return new Tab(tab.id?.toString() || "", url, tab.index, tab.groupId, tab.pinned);
  }

  async createTabByUrl(url: string): Promise<Tab> {
    const options: chrome.tabs.CreateProperties = { url };
    const tab = await chrome.tabs.create(options);

    return new Tab(
      tab.id?.toString() || "",
      tab.url || "",
      tab.index,
      tab.groupId,
      tab.pinned
    );
  }

  async createTab(tab: Tab): Promise<Tab> {
    const options: chrome.tabs.CreateProperties = tab.index !== undefined ? { url: tab.url, index: tab.index, pinned: tab.pinned } : { url: tab.url, pinned: tab.pinned };
    const newTab = await chrome.tabs.create(options);

    if (tab.groupId !== undefined && newTab.id !== undefined && tab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
      await chrome.tabs.group({ tabIds: newTab.id, groupId: tab.groupId });
    }

    return new Tab(
      newTab.id?.toString() || "",
      newTab.url || "",
      newTab.index,
      tab.groupId ?? newTab.groupId,
      tab.pinned ?? newTab.pinned
    );
  }

  async closeTab(id: string): Promise<void> {
    if (!id) return;
    await chrome.tabs.remove(parseInt(id));
  }

  async setCustomName(id: string, customName: string): Promise<void> {
    if (!id || !customName) return;
    await chrome.scripting.executeScript({
      target: { tabId: parseInt(id) },
      func: (name: string) => { document.title = name; },
      args: [customName],
    });
  }

  async clearCustomName(id: string): Promise<void> {
    if (!id) return;
    const tabId = parseInt(id);
    const tab = await chrome.tabs.get(tabId);
    const url = tab.url || tab.pendingUrl;
    if (!url) return;

    const response = await fetch(url);
    const html = await response.text();
    const match = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const originalTitle = match?.[1]?.trim() ?? "";

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (title: string) => { document.title = title; },
      args: [originalTitle],
    });
  }

  async setCustomIcon(id: string, customIcon: string): Promise<void> {
    if (!id || !customIcon) return;
    await chrome.scripting.executeScript({
      target: { tabId: parseInt(id) },
      func: (iconUrl: string) => {
        const existingLinks = document.querySelectorAll<HTMLLinkElement>(
          "link[rel~='icon'], link[rel~='shortcut']"
        );
        existingLinks.forEach((el) => el.remove());

        const link = document.createElement("link");
        link.rel = "icon";
        link.href = iconUrl;
        document.head.appendChild(link);
      },
      args: [customIcon],
    });
  }

  async clearCustomIcon(id: string): Promise<void> {
    if (!id) return;
    const tabId = parseInt(id);
    const tab = await chrome.tabs.get(tabId);
    const url = tab.url || tab.pendingUrl;
    console.log("[clearCustomIcon] tabId:", tabId, "url:", url, "favIconUrl:", tab.favIconUrl);
    if (!url) return;

    let originalIconHref = "";

    // 1. Try Chrome's cached favicon URL
    

    // 2. Fallback: fetch the page HTML and parse <link rel="icon"> tags
    if (!originalIconHref) {
      console.log("[clearCustomIcon] No cached favIconUrl, fetching HTML from:", url);
      try {
        const response = await fetch(url);
        console.log("[clearCustomIcon] Fetch response status:", response.status);
        const html = await response.text();
        console.log("[clearCustomIcon] HTML length:", html.length);
        const iconLinkRegex = /<link[^>]*\brel=["'][^"']*\bicon\b[^"']*["'][^>]*>/gi;
        const links = html.match(iconLinkRegex);
        console.log("[clearCustomIcon] Matched icon link tags:", links);
        if (links && links.length > 0) {
          const hrefMatch = links[0].match(/\bhref=["']([^"']+)["']/i);
          console.log("[clearCustomIcon] Extracted href from first link:", hrefMatch?.[1]);
          if (hrefMatch) {
            originalIconHref = hrefMatch[1].trim();
            if (!originalIconHref.startsWith("http") && !originalIconHref.startsWith("data:")) {
              const resolved = new URL(originalIconHref, url).href;
              console.log("[clearCustomIcon] Resolved relative URL:", originalIconHref, "->", resolved);
              originalIconHref = resolved;
            }
          }
        }
      } catch (e) {
        console.error("[clearCustomIcon] Fetch failed:", e);
      }
    }

    // 3. Final fallback: default /favicon.ico
    if (!originalIconHref) {
      try {
        originalIconHref = new URL("/favicon.ico", url).href;
        console.log("[clearCustomIcon] Using /favicon.ico fallback:", originalIconHref);
      } catch {
        // Invalid URL, leave empty
      }
    }

    console.log("[clearCustomIcon] Final originalIconHref:", originalIconHref);

    await chrome.scripting.executeScript({
      target: { tabId },
      func: (iconHref: string) => {
        const existingLinks = document.querySelectorAll<HTMLLinkElement>(
          "link[rel~='icon'], link[rel~='shortcut']"
        );
        console.log("[clearCustomIcon:injected] Removing", existingLinks.length, "existing icon links");
        existingLinks.forEach((el) => el.remove());

        if (iconHref) {
          const link = document.createElement("link");
          link.rel = "icon";
          link.href = iconHref;
          document.head.appendChild(link);
          console.log("[clearCustomIcon:injected] Restored icon to:", iconHref);
        } else {
          console.log("[clearCustomIcon:injected] No icon href to restore");
        }
      },
      args: [originalIconHref],
    });
  }
}
