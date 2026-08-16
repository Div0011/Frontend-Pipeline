const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'import Link from "next/link";',
  'import { Link } from "next-view-transitions";'
);

fs.writeFileSync(file, code);
console.log("Patched page.tsx links");
