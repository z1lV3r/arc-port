import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  // https://vitepress.dev/reference/site-config#site-metadata
  title: "Arc Port",
  description: "Chrome extension to port Arc browser features into chrome",
  head: [['link', { rel: 'icon', href: '/arc-port/app/assets/icon/arc-port-16.png' }]],

  // https://vitepress.dev/reference/site-config#build
  srcDir: "src",
  outDir: "dist",

  // https://vitepress.dev/reference/site-config#base
  base: '/arc-port/',

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/app/assets/icon/arc-port-128.png',

    // https://vitepress.dev/reference/default-theme-nav
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '⚙ Extensions', link: '/features/' },
      { text: '📜 Changelog', link: 'https://github.com/z1lV3r/arc-port/releases' }
    ],

    // https://vitepress.dev/reference/default-theme-sidebar
    sidebar: [
      {
        text: 'Extensions',
        items: [
          { text: 'Tab Checkpoint', link: '/features/tab-checkpoint' },
          { text: 'Tab Rebrand', link: '/features/tab-rebrand' }
        ]
      }
    ],

    // https://vitepress.dev/reference/default-theme-config#sociallinks
    socialLinks: [
      { icon: 'github', link: 'https://github.com/z1lV3r/arc-port' },
      { icon: 'reddit', link: 'https://www.reddit.com/r/arc-port' }
    ],

    // https://vitepress.dev/reference/default-theme-config#footer
    footer: {
      message: `
      <a href="/arc-port/terms-and-conditions">Terms and Conditions</a> | <a href="/arc-port/privacy-policy">Privacy Policy</a>
      `,
      copyright: `© ${new Date().getFullYear()} Arc Port. Open-source.`
    }
  },

  // https://vitepress.dev/guide/routing#route-rewrites
  rewrites: {
    'app/:file.md': ':file.md'
  }
})
