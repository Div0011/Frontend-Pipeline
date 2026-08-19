declare module '@playwright/test' {
  interface Browser {
    name: string;
  }

  interface BrowserContextOptions {
    'browserstack.user'?: string;
    'browserstack.key'?: string;
    [key: string]: unknown;
  }

  interface Device {
    name: string;
    userAgent: string;
    viewport: { width: number; height: number };
  }

  interface TestOptions {
    'browserstack.user'?: string;
    'browserstack.key'?: string;
    [key: string]: unknown;
  }
}
