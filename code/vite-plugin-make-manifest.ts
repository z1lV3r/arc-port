import type { PluginOption } from "vite";
import manifest from "./src/app/infrastructure/chrome-manifest.config";

export function makeManifestPlugin(): PluginOption {
  return {
    name: "make-manifest",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "manifest.json",
        source: JSON.stringify(manifest, null, 2),
      });
    },
  };
}
