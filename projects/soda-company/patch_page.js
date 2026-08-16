const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('VideoScrub')) {
  // Add import
  code = code.replace(
    'import NavigationMenu from "@/components/NavigationMenu";',
    'import NavigationMenu from "@/components/NavigationMenu";\nimport VideoScrub from "@/components/VideoScrub";'
  );

  // Update AboutSection
  const aboutSectionRegex = /function AboutSection\(\) \{[\s\S]*?return \([\s\S]*?className="relative w-full py-32 px-6 md:px-16 border-t border-white\/10 overflow-hidden"[\s\S]*?>/;
  
  code = code.replace(aboutSectionRegex, (match) => {
    return match + '\n      {/* Cinematic Video Scrubbing Background */}\n      <div className="absolute inset-0 z-0">\n        <VideoScrub \n          frameCount={300}\n          framePrefix="/frames/product/frame_"\n          frameExtension="webp"\n          start="top bottom"\n          end="bottom top"\n        />\n        {/* Dark overlay for text readability */}\n        <div className="absolute inset-0 bg-gradient-to-b from-[#09090f]/30 to-[#0a0a12]/90 mix-blend-multiply" />\n      </div>\n';
  });
  
  // Make sure contents inside AboutSection are above the video
  code = code.replace(
    '<div className="max-w-6xl mx-auto">',
    '<div className="max-w-6xl mx-auto relative z-10">'
  );
  
  // Make the AboutSection taller so we can scroll through the frames properly
  code = code.replace(
    'className="relative w-full py-32 px-6 md:px-16 border-t border-white/10 overflow-hidden"',
    'className="relative w-full py-64 px-6 md:px-16 border-t border-white/10 overflow-hidden"'
  );
  
  fs.writeFileSync(file, code);
  console.log("Patched page.tsx with VideoScrub");
} else {
  console.log("Already patched");
}
