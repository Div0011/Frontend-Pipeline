const fs = require('fs');
const file = 'src/app/globals.css';
let code = fs.readFileSync(file, 'utf8');

// Remove everything after "/* View Transitions API */"
const splitIndex = code.indexOf('/* View Transitions API */');
if (splitIndex !== -1) {
  code = code.substring(0, splitIndex);
}

const validCSS = `
/* View Transitions API */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
}

::view-transition-old(root) {
  animation: fade-out 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

::view-transition-new(root) {
  animation: slide-up-in 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

@keyframes fade-out {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
}

@keyframes slide-up-in {
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
}
`;

fs.writeFileSync(file, code + validCSS);
console.log("Patched globals.css");
