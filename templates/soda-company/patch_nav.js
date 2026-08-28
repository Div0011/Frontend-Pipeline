const fs = require('fs');
const file = 'src/components/NavigationMenu.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'import Link from "next/link";',
  'import { Link } from "next-view-transitions";'
);

fs.writeFileSync(file, code);
console.log("Patched NavigationMenu.tsx");
