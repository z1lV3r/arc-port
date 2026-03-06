import * as fs from "fs";
import * as path from "path";
import { pathToFileURL } from "url";
import type { PluginOption } from "vite";
import manifest from "./src/app/infrastructure/config/chrome-manifest.config";

export function makeManifestPlugin(): PluginOption {
  return {
    name: "make-manifest",
    async generateBundle() {
      // 1. Recursive scan for manifest chunks and shortcut commands
      const featuresDir = path.resolve(__dirname, "src/features");
      const manifestChunks: string[] = [];
      const shortcutFiles: string[] = [];

      const findManifests = (dir: string) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          const fullPath = path.join(dir, file.name);
          if (file.isDirectory()) {
            findManifests(fullPath);
          } else if (file.name === "chrome-manifest.config.ts") {
            manifestChunks.push(fullPath);
          } else if (
            file.name.endsWith(".ts") &&
            path.basename(dir) === "shortcut-listeners"
          ) {
            shortcutFiles.push(fullPath);
          }
        }
      };

      findManifests(featuresDir);

      // 2. Merge chunks
      const finalManifest = JSON.parse(JSON.stringify(manifest)); // clone

      for (const chunkPath of manifestChunks) {
        try {
          // Attempt dynamic import.
          const formattedPath = pathToFileURL(chunkPath).href;
          const chunkModule = await import(formattedPath);
          const chunk = chunkModule.default || chunkModule;

          mergeManifests(finalManifest, chunk);
        } catch (e) {
          console.error(`Failed to load manifest chunk at ${chunkPath}:`, e);
        }
      }

      // 3. Process shortcuts
      for (const shortcutPath of shortcutFiles) {
        try {
          const content = fs.readFileSync(shortcutPath, "utf-8");
          // Regex extraction
          const nameMatch = content.match(/name\s*=\s*"([^"]+)"/);
          const descMatch = content.match(/description\s*=\s*"([^"]+)"/);
          const keyMatch = content.match(/key\s*=\s*\{([\s\S]*?)\}/);

          if (nameMatch && descMatch && keyMatch) {
            const name = nameMatch[1];
            const description = descMatch[1];
            const keyBlock = keyMatch[1];

            const defaultKeyMatch = keyBlock.match(/default\s*:\s*"([^"]+)"/);
            const macKeyMatch = keyBlock.match(/mac\s*:\s*"([^"]+)"/);

            const suggested_key: any = {};
            if (defaultKeyMatch) suggested_key.default = defaultKeyMatch[1];
            if (macKeyMatch) suggested_key.mac = macKeyMatch[1];

            const commandEntry = {
              [name]: {
                suggested_key,
                description,
              },
            };

            mergeManifests(finalManifest, { commands: commandEntry });
          }
        } catch (e) {
          console.error(
            `Failed to process shortcut file at ${shortcutPath}:`,
            e,
          );
        }
      }

      this.emitFile({
        type: "asset",
        fileName: "manifest.json",
        source: JSON.stringify(finalManifest, null, 2),
      });
    },
  };
}

function mergeManifests(target: any, source: any) {
  for (const key in source) {
    if (Array.isArray(source[key])) {
      target[key] = (target[key] || []).concat(source[key]);
      // Deduplicate simple arrays like permissions
      if (key === "permissions") {
        target[key] = [...new Set(target[key])];
      }
    } else if (typeof source[key] === "object" && source[key] !== null) {
      if (!target[key]) {
        target[key] = {};
      }
      mergeManifests(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
