---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tab Checkpoint"
  text: ""
  tagline: "It's dangerous to navigate for long, take this checkpoint before you're gone."
  image:
    src: /features/checkpoint/256.png
    alt: Tab Checkpoint
  actions:
    - theme: brand
      text: Chrome web store
      link: https://chromewebstore.google.com/detail/arc-port/kajmnfhpmkimleehomeioondgfcjjnbp
    - theme: alt
      text: Download
      link: https://github.com/z1lV3r/arc-port/releases/latest
--- 

![Checkpoint feature overview](/features/checkpoint/checkpoint.png)



## How it works

Set a navigation checkpoint, allowing you to return to a specific page instantly whenever you need a fresh restart.

<video src="/features/checkpoint/demo.mp4" autoplay loop muted playsinline disablepictureinpicture style="width: 100%; border-radius: 8px; margin: 1rem 0;" controls controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"></video>

## Operations

| Operation | Keyboard shortcut | Context menu | UI |
| :---: | :---: | :---: | :---: |
| Set checkpoint | `Alt+Shift+S` / `Option+Shift+S` | ✔ | ✔ |
| Clear checkpoint | `Alt+Shift+K` / `Option+Shift+K` | ✔ | ✔ |
| Reset to checkpoint | `Alt+Shift+R` / `Option+Shift+R` | ✔ | ✔ |
| Reset or close to checkpoint | `Alt+Shift+D` / `Option+Shift+D` | ❌ | ❌ |

::: info Reset or close to checkpoint
If the current page is not the checkpoint, it resets to it. If the current page is the checkpoint, it closes the tab.
:::

## Browser integrations

### Automatic checkpoint
> When a tab is pinned

<video src="/features/checkpoint/checkpoint-set-on-pin.mp4" autoplay loop muted playsinline disablepictureinpicture style="width: 100%; border-radius: 8px; margin: 1rem 0;" controls controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"></video>

<br/>

> When a tab is added to a group

<video src="/features/checkpoint/checkpoint-set-on-set-group.mp4" autoplay loop muted playsinline disablepictureinpicture style="width: 100%; border-radius: 8px; margin: 1rem 0;" controls controlslist="nofullscreen nodownload noremoteplayback noplaybackrate"></video>
