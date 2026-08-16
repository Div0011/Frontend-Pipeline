const fs = require('fs');
const file = 'src/app/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('ViewTransitions')) {
  code = code.replace(
    'export default function RootLayout',
    'import { ViewTransitions } from "next-view-transitions";\n\nexport default function RootLayout'
  );

  code = code.replace(
    '<html lang="en"',
    '<ViewTransitions>\n    <html lang="en"'
  );
  
  code = code.replace(
    '</html>',
    '</html>\n    </ViewTransitions>'
  );

  fs.writeFileSync(file, code);
  console.log("Patched layout.tsx with ViewTransitions");
} else {
  console.log("Already patched");
}
