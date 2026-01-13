import ChromeBrowserService from "./infrastructure/chrome-browser-service";

export function getDependencies(): Map<string, any> {
  const dependencies = new Map<string, any>();

  const userAgent = navigator.userAgent.toLowerCase();
  const browserName = userAgent.includes("firefox") ? "firefox" : "chrome";

  if (browserName === "chrome") {
    setChromeDependencies(dependencies);
  }

  return dependencies;
}

function setChromeDependencies(dependencies: Map<string, any>) {
  dependencies.set("browserService", new ChromeBrowserService());
}
