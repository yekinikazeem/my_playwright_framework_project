import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  workers: 1,

  use: {
    baseURL: 'https://www.saucedemo.com',
    // Run tests headlessly for CI-style runs
    headless: true,
    // Capture artifacts only on failures to reduce noise
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  retries: 1,

  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome'
      }
    }
  ],

  reporter: [
    ['html'],
    ['list']
  ]
});
