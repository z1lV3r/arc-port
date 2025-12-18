import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  // https://vitepress.dev/reference/site-config#site-metadata
  title: "Arc Port",
  description: "Chrome extension to port Arc browser features into chrome",
  head: [['link', { rel: 'icon', href: '/global/assets/icon/arc-port-16.png' }]],
  
  // https://vitepress.dev/reference/site-config#build
  srcDir: "src",
  outDir: "dist",

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/global/assets/icon/arc-port-128.png',

    // https://vitepress.dev/reference/default-theme-nav
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '📜 Changelog', link: '/changelog' },
      { text: '🚀 Features', link: '/features/' }
    ],

    // https://vitepress.dev/reference/default-theme-sidebar
    sidebar: [
      {
        text: 'Features',
        items: [
          { text: 'Markdown Examples', link: '/features/markdown-examples' }
        ]
      }
    ],

    // https://vitepress.dev/reference/default-theme-config#sociallinks
    socialLinks: [
      { icon: 'github', link: 'https://github.com/z1lV3r/arc-port' },
      { icon: 'reddit', link: 'https://www.reddit.com/r/arc-port' }
    ]
  },

  // https://vitepress.dev/guide/routing#route-rewrites
  rewrites: {
    'global/:file.md': ':file.md'
  }
})
