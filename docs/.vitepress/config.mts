import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "pages",

  title: "Arc Port - Chrome extension",
  description: "Chrome extension to port Arc browser features into chrome",
  themeConfig: {
    logo: '/global/icon/arc-port-128.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/features/markdown-examples' },
          { text: 'Runtime API Examples', link: '/features/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/z1lV3r/arc-port' },
      { icon: 'reddit', link: 'https://www.reddit.com/r/arc-port' }
    ]
  }
})
