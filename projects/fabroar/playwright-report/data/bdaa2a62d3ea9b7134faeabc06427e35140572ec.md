# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/product-cart-checkout.spec.ts >> Product, cart, and checkout flow >> adds product to cart from product page
- Location: tests/smoke/product-cart-checkout.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Added to cart')
Expected: visible
Error: strict mode violation: locator('text=Added to cart') resolved to 2 elements:
    1) <div class="bg-[#D4654A] text-[#F5F0E8] px-8 py-4 font-ui text-sm font-bold tracking-widest uppercase shadow-2xl rounded-sm">Added to Cart! ✓</div> aka getByText('Added to Cart! ✓').first()
    2) <button class="w-full py-4 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#E07A60] transition-all rounded-sm shadow-xl flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-40">…</button> aka getByRole('button', { name: 'Added to Cart! ✓' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Added to cart')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic:
    - generic:
      - generic: FABROAR
      - generic: 100%
      - paragraph: FABROAR • GRAPHIC TEES
  - generic [ref=e4]:
    - banner:
      - navigation:
        - link "FABROAR":
          - /url: /
          - generic:
            - img "FABROAR"
        - generic:
          - link "Home":
            - /url: /
          - link "Men":
            - /url: /men/
          - link "Women":
            - /url: /women/
          - link "Custom Studio":
            - /url: /customize/
          - link "Contact":
            - /url: /contact/
        - generic:
          - button "Switch to light theme"
          - button "Open cart":
            - generic: "1"
    - navigation [ref=e6]:
      - link "Back to Men's Collection" [ref=e8]:
        - /url: /men/
    - generic [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e14]:
          - img "Animal Round Neck Regular Fit Printed T-Shirt" [ref=e15]
          - generic [ref=e16]: Click for Full Screen View
          - generic [ref=e23]: men • Pure Cotton
          - generic [ref=e24]: Added to Cart! ✓
        - generic [ref=e26]:
          - button [ref=e27]:
            - img "Animal Round Neck Regular Fit Printed T-Shirt view 1" [ref=e28]
          - button [ref=e29]:
            - img "Animal Round Neck Regular Fit Printed T-Shirt view 2" [ref=e30]
          - button [ref=e31]:
            - img "Animal Round Neck Regular Fit Printed T-Shirt view 3" [ref=e32]
          - button [ref=e33]:
            - img "Animal Round Neck Regular Fit Printed T-Shirt view 4" [ref=e34]
      - generic [ref=e35]:
        - generic [ref=e36]: FABROAR ORIGINAL
        - heading "Animal Round Neck Regular Fit Printed T-Shirt" [level=1] [ref=e37]
        - generic [ref=e38]:
          - paragraph [ref=e39]: ₹449
          - generic [ref=e40]: ★ 4.8 / 5.0
        - paragraph [ref=e41]: Bold animal graphic on a classic regular fit tee. Pure cotton comfort with a statement print.
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]: Select Size
            - button "Size Guide" [ref=e45]
          - generic [ref=e52]:
            - button "XS" [ref=e53]
            - button "S" [ref=e54]
            - button "M" [ref=e55]
            - button "L" [ref=e56]
            - button "XL" [ref=e57]
            - button "XXL" [ref=e58]
        - generic [ref=e59]:
          - generic [ref=e60]: Quantity
          - generic [ref=e61]:
            - button "Decrease quantity" [ref=e62]
            - generic [ref=e64]: "1"
            - button "Increase quantity" [ref=e65]
        - generic [ref=e67]:
          - button "Added to Cart! ✓" [active] [ref=e68]
          - link "Customize In Studio" [ref=e72]:
            - /url: /customize/
        - generic [ref=e75]:
          - generic [ref=e76]:
            - strong [ref=e77]: "Product Details:"
            - list [ref=e78]:
              - listitem [ref=e79]: Regular fit
              - listitem [ref=e80]: Round neck
              - listitem [ref=e81]: Short sleeves
              - listitem [ref=e82]: Pure cotton
              - listitem [ref=e83]: Graphic print
          - generic [ref=e84]:
            - strong [ref=e85]: "Wash Care:"
            - list [ref=e86]:
              - listitem [ref=e87]: Wash and iron inside out
              - listitem [ref=e88]: Machine wash in cold water
              - listitem [ref=e89]: Do not bleach
              - listitem [ref=e90]: Tumble dry at low heat
    - contentinfo [ref=e91]:
      - generic [ref=e92]:
        - link "FABROAR" [ref=e94]:
          - /url: /
        - generic [ref=e95]:
          - generic [ref=e96]:
            - link "Fabroar" [ref=e97]:
              - /url: /
            - paragraph [ref=e98]: Graphic printed pure cotton T-shirts for men and women. Designed for those who have something to say.
            - generic [ref=e99]:
              - link "Instagram" [ref=e100]:
                - /url: https://www.instagram.com/fabroarstore/
              - link "Facebook" [ref=e104]:
                - /url: https://www.facebook.com/profile.php?id=61566816764337
          - generic [ref=e107]:
            - heading "Shop" [level=4] [ref=e108]
            - list [ref=e109]:
              - listitem [ref=e110]:
                - link "Men" [ref=e111]:
                  - /url: /men/
              - listitem [ref=e116]:
                - link "Women" [ref=e117]:
                  - /url: /women/
              - listitem [ref=e122]:
                - link "Custom Studio" [ref=e123]:
                  - /url: /customize/
          - generic [ref=e128]:
            - heading "Support" [level=4] [ref=e129]
            - list [ref=e130]:
              - listitem [ref=e131]:
                - link "Contact" [ref=e132]:
                  - /url: /contact/
              - listitem [ref=e133]:
                - link "About" [ref=e134]:
                  - /url: /about/
              - listitem [ref=e135]:
                - link "Privacy" [ref=e136]:
                  - /url: /legal/privacy/
              - listitem [ref=e137]:
                - link "Returns" [ref=e138]:
                  - /url: /legal/returns/
        - generic [ref=e139]:
          - paragraph [ref=e140]: © 2026 Fabroar. All rights reserved.
          - generic [ref=e141]:
            - link "Privacy" [ref=e142]:
              - /url: /legal/privacy/
            - link "Returns" [ref=e143]:
              - /url: /legal/returns/
            - link "Terms" [ref=e144]:
              - /url: /legal/terms/
  - alert [ref=e145]
  - generic [ref=e147]:
    - generic [ref=e148]:
      - heading "Your Cart" [level=2] [ref=e149]
      - button "Close cart" [ref=e150]
    - generic [ref=e156]:
      - img "Animal Round Neck Regular Fit Printed T-Shirt" [ref=e158]
      - generic [ref=e159]:
        - heading "Animal Round Neck Regular Fit Printed T-Shirt" [level=3] [ref=e160]
        - paragraph [ref=e161]: "Size: M"
        - generic [ref=e162]:
          - generic [ref=e163]:
            - button "Decrease quantity" [ref=e164]
            - generic [ref=e166]: "1"
            - button "Increase quantity" [ref=e167]
          - button "Remove" [ref=e169]
        - paragraph [ref=e170]: ₹449
    - generic [ref=e171]:
      - generic [ref=e172]:
        - generic [ref=e173]: Subtotal
        - generic [ref=e174]: ₹449
      - paragraph [ref=e175]: Delivery calculated at checkout. Free over ₹499.
      - link "Checkout" [ref=e176]:
        - /url: /checkout/
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Product, cart, and checkout flow", () => {
  4  |   test("adds product to cart from product page", async ({ page }) => {
  5  |     await page.goto("/product/animal-graphic-round-neck-regular-fit-printed-t-shirt");
  6  |     await page.click('button:has-text("M")');
  7  |     await page.click('button:has-text("Add to Cart — ₹449")');
> 8  |     await expect(page.locator("text=Added to cart")).toBeVisible();
     |                                                      ^ Error: expect(locator).toBeVisible() failed
  9  |   });
  10 | 
  11 |   test("shows empty checkout page", async ({ page }) => {
  12 |     await page.goto("/checkout");
  13 |     await expect(page.locator("text=Your cart is empty")).toBeVisible();
  14 |   });
  15 | 
  16 |   test("navigates to about page", async ({ page }) => {
  17 |     await page.goto("/about");
  18 |     await expect(page.locator("h1")).toContainText(/we make clothes/i);
  19 |   });
  20 | 
  21 |   test("navigates to contact page", async ({ page }) => {
  22 |     await page.goto("/contact");
  23 |     await expect(page.locator("h1, h2")).toContainText(/contact/i);
  24 |   });
  25 | });
  26 | 
```