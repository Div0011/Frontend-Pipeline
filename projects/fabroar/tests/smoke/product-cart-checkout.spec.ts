import { test, expect } from "@playwright/test";

test.describe("Product, cart, and checkout flow", () => {
  test("adds product to cart from product page", async ({ page }) => {
    await page.goto("/product/animal-graphic-round-neck-regular-fit-printed-t-shirt");
    await page.click('button:has-text("M")');
    await page.click('button:has-text("Add to Cart — ₹449")');
    await expect(page.locator("text=Added to cart")).toBeVisible();
  });

  test("shows empty checkout page", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page.locator("text=Your cart is empty")).toBeVisible();
  });

  test("navigates to about page", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toContainText(/we make clothes/i);
  });

  test("navigates to contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1, h2")).toContainText(/contact/i);
  });
});
