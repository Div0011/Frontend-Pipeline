// Polyfill to prevent crashes in Node.js when localStorage is partially defined (e.g. as an empty object)
if (typeof globalThis !== "undefined") {
  const mockStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };

  const ls = (globalThis as any).localStorage;
  if (typeof ls === "undefined" || ls === null || typeof ls.getItem !== "function") {
    try {
      Object.defineProperty(globalThis, "localStorage", {
        value: mockStorage,
        writable: true,
        configurable: true,
      });
    } catch (e) {
      (globalThis as any).localStorage = mockStorage;
    }
  }

  const ss = (globalThis as any).sessionStorage;
  if (typeof ss === "undefined" || ss === null || typeof ss.getItem !== "function") {
    try {
      Object.defineProperty(globalThis, "sessionStorage", {
        value: mockStorage,
        writable: true,
        configurable: true,
      });
    } catch (e) {
      (globalThis as any).sessionStorage = mockStorage;
    }
  }
}
