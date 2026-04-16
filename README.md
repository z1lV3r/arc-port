<div align="center">

![Arc Port](https://raw.githubusercontent.com/z1lV3r/arc-port/refs/heads/beta/docs/src/public/app/assets/icon/arc-port-128.png)

# Arc Port

> Chrome extension that brings the best Arc browser features to Google Chrome.

[![Official site](https://img.shields.io/badge/Official_site-grey?logo=github&style=for-the-badge)](https://z1lv3r.github.io/arc-port/) [![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-grey?logo=chromewebstore&style=for-the-badge)](https://chrome.google.com/webstore/detail/arc-port/)

[![Release](https://img.shields.io/github/v/release/z1lV3r/arc-port?label=release&color=orange)](https://github.com/z1lV3r/arc-port/releases)
[![Beta Release](https://img.shields.io/github/v/release/z1lV3r/arc-port?include_prereleases&label=beta&color=blueviolet)](https://github.com/z1lV3r/arc-port/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-vitepress-green)](https://z1lv3r.github.io/arc-port/)

[![Ko-fi](https://img.shields.io/badge/Ko--fi-grey?logo=ko-fi&style=for-the-badge)](https://ko-fi.com/Y8Y21T3HAL)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-grey?logo=buy-me-a-coffee&style=for-the-badge)](https://www.buymeacoffee.com/z1lV3r)
[![Thanks.dev](https://img.shields.io/badge/Thanks.dev-grey?logo=devbox&style=for-the-badge)](https://thanks.dev/u/z1lv3r)
[![Product Hunt](https://img.shields.io/badge/Product_Hunt-grey?logo=producthunt&style=for-the-badge)](https://www.producthunt.com/products/arc-port)
</div>

## 🚀 Features

- ↩️ [Checkpoint](https://z1lv3r.github.io/arc-port/features/checkpoint) - Set a navigation checkpoint, allowing you to return to a specific page instantly whenever you need a fresh restart.

## 📥 Manual installation

Download the latest release and load it as an unpacked extension:

1. Download the latest `arc-port.zip` from the [Releases page](https://github.com/z1lV3r/arc-port/releases).
2. Unzip the file.
3. In Chrome, navigate to `chrome://extensions`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the unzipped `dist` folder.

## 💻 Development

### Prerequisites

- [Node.js](https://nodejs.org/) v24+
- npm

### Setup

```bash
# Install dependencies
cd code
npm install
```

### Available Scripts

```bash
# Build the extension (outputs to code/dist)
npm run build

# Run unit tests
npm test

# Run end-to-end tests
npm run test:e2e

```

After running `npm run build`, load the `code/dist` folder as an unpacked extension in Chrome (see [Installation](#-installation)).

### Running the Docs locally

```bash
cd docs
npm install
npm run dev
```

---

## 📄 License

MIT © [Hugo Villanueva Jimenez](LICENSE)
