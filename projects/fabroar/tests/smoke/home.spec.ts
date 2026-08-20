import { test, expect } from "@playwright/test";

test.describe("Homepage smoke", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero and navigation", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("img[alt='FABROAR']")).toBeVisible();
  });

  test("shows product grid on homepage", async ({ page }) => {
    const productLinks = page.locator("article button");
    await expect(productLinks.first()).toBeVisible();
  });

  test("navigates to men category", async ({ page }) => {
    await page.click('a[href="/men/"]');
    await expect(page).toHaveURL(/\/men\//);
    await expect(page.locator("h1, h2")).toContainText(/men/i);
  });

  test("navigates to women category", async ({ page }) => {
    await page.click('a[href="/women/"]');
    await expect(page).toHaveURL(/\/women\//);
    await expect(page.locator("h1, h2")).toContainText(/women/i);
  });

  test("opens cart drawer", async ({ page }) => {
    await page.click('[aria-label="Open cart"], button:has-text("Open cart")');
    await expect(page.locator("text=Your cart is empty")).toBeVisible();
  });

  test("opens customize page", async ({ page }) => {
    await page.click('a[href="/customize/"]');
    await expect(page).toHaveURL(/\/customize\//);
  });
});
