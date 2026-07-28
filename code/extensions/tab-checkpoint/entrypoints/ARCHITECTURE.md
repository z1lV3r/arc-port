# `/entrypoints` Architecture

Required by the **WXT Framework**, this directory defines the actual extension entry points (background scripts, popup HTML, options page) that are bundled into the final extension manifest.

## Folders
- `/background`: The Service Worker entry point.
- `/options`: Contains `options.tsx`, `index.html`, and `style.css` which render the extension's settings/options page.
- `/popup`: Contains `main.tsx`, `index.html`, and `style.css` which render the extension's popup interface when the toolbar icon is clicked.
