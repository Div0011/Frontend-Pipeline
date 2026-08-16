const fs = require('fs');
const file = 'src/stores/sceneStore.ts';
let code = fs.readFileSync(file, 'utf8');

const heroLogic = `
      // SECTION 1: HERO
      if (activeSection === "hero") {
        const p = sectionProgress; // 0 to 1
        
        if (slug === "classic") { // Red Can
          return {
            position: [-2.5 - (p * 8), -0.5, 0.5 - (p * 2)],
            rotation: [0.2, 0.4, 0.1 - (p * 0.5)],
            scale: Math.max(0.001, 1 - p * 1.5),
          };
        }
        if (slug === "cool") { // Black Can
          return {
            position: [2.5 + (p * 8), -0.8, 0.5 - (p * 2)],
            rotation: [-0.15, -0.5, -0.1 + (p * 0.5)],
            scale: Math.max(0.001, 0.95 - p * 1.5),
          };
        }
        // Diet (Silver Can) - Center
        return {
          position: [0, 0.2 + (p * 10), 1.0],
          rotation: [0, p * 2, 0],
          scale: Math.max(0.001, 1.1 - p * 2),
        };
      }
`;

code = code.replace(
  /\/\/ SECTION 1: HERO[\s\S]*?\/\/ SECTION 2: TRIO SELECTION STAGE/,
  heroLogic.trim() + "\n\n      // SECTION 2: TRIO SELECTION STAGE"
);

fs.writeFileSync(file, code);
console.log("Patched sceneStore.ts for Hero choreography");
