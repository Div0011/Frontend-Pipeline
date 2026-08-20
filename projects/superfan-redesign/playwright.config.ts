import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT ?? 3480;
const isCI = !!process.env.BROWSERSTACK_USERNAME && !!process.env.BROWSERSTACK_ACCESS_KEY;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : 4,
  reporter: isCI ? 'html' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: process.env.CI ? `npm run start -- -p ${PORT}` : `npm run dev -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: isCI
    ? [
        {
          name: 'bs-android',
          use: {
            ...devices['Pixel 7'],
            browserName: 'chromium',
          } as any,
        },
        {
          name: 'bs-iphone',
          use: {
            ...devices['iPhone 14'],
            browserName: 'chromium',
          } as any,
        },
      ]
    : [
        {
          name: 'chromium-desktop',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'iphone',
          use: { ...devices['iPhone 13'] },
        },
        {
          name: 'android',
          use: { ...devices['Pixel 5'] },
        },
      ],
});
