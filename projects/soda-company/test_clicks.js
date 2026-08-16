const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3461');
  
  // Wait for loading screen to disappear
  await page.waitForTimeout(5000);
  
  // Find menu button
  const menuBtn = await page.$('header button');
  if (menuBtn) {
    const box = await menuBtn.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    
    const topElement = await page.evaluate(({x, y}) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return null;
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        pointerEvents: window.getComputedStyle(el).pointerEvents,
        zIndex: window.getComputedStyle(el).zIndex
      };
    }, {x, y});
    
    console.log("Element on top of menu button:", topElement);
  } else {
    console.log("Menu button not found");
  }

  // Find center of screen
  const topElementCenter = await page.evaluate(() => {
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    if (!el) return null;
    return {
      tag: el.tagName,
      id: el.id,
      className: el.className,
      pointerEvents: window.getComputedStyle(el).pointerEvents,
      zIndex: window.getComputedStyle(el).zIndex
    };
  });
  console.log("Element on top of center:", topElementCenter);

  await browser.close();
})();
