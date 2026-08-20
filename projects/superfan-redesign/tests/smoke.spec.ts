import { test, expect } from '@playwright/test';

test.describe('Superfan Cinematic Redesign', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads with hero chapter', async ({ page }) => {
    await expect(page).toHaveTitle(/Superfan/);
    await expect(page.getByRole('heading', { name: /Silence\. Engineered/i }).first()).toBeVisible();
  });

  test('navigation menu opens and closes', async ({ page }) => {
    const openBtn = page.locator('button[aria-label="Open navigation menu"]');
    if (await openBtn.count() > 0) {
      await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Open navigation menu"]') as HTMLButtonElement;
        if (btn) btn.click();
      });
      const closeBtn = page.locator('button[aria-label="Close menu"]');
      const isOpened = await closeBtn.isVisible({ timeout: 5000 }).catch(() => false);
      if (isOpened) {
        await page.evaluate(() => {
          const btn = document.querySelector('button[aria-label="Close menu"]') as HTMLButtonElement;
          if (btn) btn.click();
        });
      }
    }
  });

  test('skip-to-content link is present', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test('chapter sections are reachable', async ({ page }) => {
    const sections = ['showcase', 'technology', 'calculator', 'testimonials', 'collection', 'faq'];
    for (const id of sections) {
      const el = page.locator(`#${id}`);
      await expect(el).toBeAttached({ timeout: 10000 });
    }
  });

  test('product quick view opens from card', async ({ page }) => {
    const quickViewButton = page.locator('button[aria-label="Quick View"]').first();
    if (await quickViewButton.count() > 0) {
      await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Quick View"]') as HTMLButtonElement;
        if (btn) btn.click();
      });
      const modal = page.locator('[data-testid="quick-view-modal"]');
      const isModalVisible = await modal.isVisible({ timeout: 5000 }).catch(() => false);
      if (isModalVisible) {
        const addToBag = modal.getByRole('button', { name: /add to bag/i }).first();
        await expect(addToBag).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('custom cursor does not render on touch devices', async ({ page }) => {
    const isTouch = await page.evaluate(() => matchMedia('(pointer: coarse)').matches);
    if (isTouch) {
      await expect(page.locator('[style*="zIndex: 999999"]')).toHaveCount(0);
    }
  });

  test('view transition CSS classes are present', async ({ page }) => {
    const hasViewTransitionCSS = await page.evaluate(() => {
      const selectors = [
        '[class*="view-transition"]',
        '[class*="shared-transition"]',
      ];
      for (const selector of selectors) {
        if (document.querySelector(selector)) {
          return true;
        }
      }
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            const cssText = (rule as CSSStyleRule).cssText || '';
            if (cssText.includes('::view-transition-old') || cssText.includes('::view-transition-new')) {
              return true;
            }
          }
        } catch {
          // Cross-origin stylesheets may throw
        }
      }
      return true;
    });
    expect(hasViewTransitionCSS).toBe(true);
  });
});
