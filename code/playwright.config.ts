import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Chrome Extension integration testing
 * 
 * This configuration is optimized for testing Chrome extensions by:
 * - Using Chromium browser
 * - Loading the extension from the dist folder
 * - Configuring proper test directories
 */
export default defineConfig({
  testDir: './tests/integration',
  testMatch: '**/*.test.ts',
  
  /* Maximum time one test can run */
  timeout: 30 * 1000,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Reporter to use */
  reporter: 'html',
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium-extension',
      use: { 
        ...devices['Desktop Chrome'],
        // Chrome extension specific configuration
        // The extension will be loaded via test fixtures
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
