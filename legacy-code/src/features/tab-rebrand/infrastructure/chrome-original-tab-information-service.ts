import type { BrowserTabsService } from "@/shared/domain/interfaces/browser-tabs-service";
import type { OriginalTabInformationService } from "../domain/interfaces/original-tab-information-service";

export class ChromeOriginalTabInformationService implements OriginalTabInformationService {
  
  private readonly chromeTabsService: BrowserTabsService;
  
  constructor(chromeTabsService: BrowserTabsService) {
    this.chromeTabsService = chromeTabsService;
  }

  async getOriginalName(tabId: string): Promise<string> {
    const tab = await this.chromeTabsService.getTab(tabId);
    const url = tab.url;
    if (!url) return "";
    const response = await fetch(url);
    const html = await response.text();
    const match = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const originalTitle = match?.[1]?.trim() ?? "";

    return originalTitle;
  }

  async getOriginalIcon(tabId: string): Promise<string> {
    const tab = await this.chromeTabsService.getTab(tabId);
    const url = tab.url;
    if (!url) return "";
    
    let originalIconHref = "";

    // 1. Fetch the page HTML and parse <link rel="icon"> tags
    try {
      const response = await fetch(url);
      const html = await response.text();
      const iconLinkRegex = /<link[^>]*\brel=["'][^"']*\bicon\b[^"']*["'][^>]*>/gi;
      const links = html.match(iconLinkRegex);
      if (links && links.length > 0) {
        const hrefMatch = links[0].match(/\bhref=["']([^"']+)["']/i);
        if (hrefMatch) {
          originalIconHref = hrefMatch[1].trim();
          if (!originalIconHref.startsWith("http") && !originalIconHref.startsWith("data:")) {
            const resolved = new URL(originalIconHref, url).href;
            originalIconHref = resolved;
          }
        }
      }
    } catch (e) {
      console.error("[clearCustomIcon] Fetch failed:", e);
    }

    // 2. Fallback: default /favicon.ico
    if (!originalIconHref) {
      try {
        originalIconHref = new URL("/favicon.ico", url).href;
      } catch {
      }
    }

    return originalIconHref;
  }
}