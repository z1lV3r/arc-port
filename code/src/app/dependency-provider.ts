import type { BrowserService } from "./domain/interfaces/browser-service";
import ChromeBrowserService from "./infrastructure/chrome-browser-service";

export class DependencyProvider {
  private browserService: BrowserService;

  constructor() {
    const userAgent = navigator.userAgent.toLowerCase();
    const browserName = userAgent.includes("firefox") ? "firefox" : "chrome";

    if (browserName === "chrome") {
      this.browserService = new ChromeBrowserService();
    } else {
      throw new Error("Unsupported browser");
    }
  }

  getBrowserService(): BrowserService {
    return this.browserService;
  }
}
