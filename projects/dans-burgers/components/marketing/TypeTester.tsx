"use client";

import { useState } from "react";

const fonts = [
  {
    id: "dans-display",
    name: "Dan's Display",
    className: "font-display",
    designer: "Austin Diner Type",
    weight: "400 (Bold Impact)",
    description: "Punchy, authentic display face echoing the 1973 South Congress neon sign and vintage menu boards.",
    defaultText: "DAN'S HAMBURGERS: AUSTIN'S ORIGINAL SINCE 1973",
  },
  {
    id: "heritage-serif",
    name: "Heritage Serif",
    className: "font-serif italic",
    designer: "Texas Editorial",
    weight: "400 (Regular Italic)",
    description: "Warm, timeless serif expressing over 50 years of Dan & Frances Junk's family legacy.",
    defaultText: "Made to order with 100% Certified Angus chuck.",
  },
  {
    id: "kitchen-mono",
    name: "Kitchen Mono",
    className: "font-mono uppercase",
    designer: "Austin Griddle Station",
    weight: "400 (Regular)",
    description: "Technical monospace font used for griddle temperatures, order tracking, and store coordinates.",
    defaultText: "SEAR TEMP: 215C | LOCATIONS: 4 | EST: 1973",
  },
];

export default function TypeTester() {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [text, setText] = useState(fonts[0].defaultText);
  const [fontSize, setFontSize] = useState(64);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);
  const [lineHeight, setLineHeight] = useState(1.1);

  const handleFontChange = (fontId: string) => {
    const font = fonts.find((f) => f.id === fontId);
    if (font) {
      setSelectedFont(font);
      setText(font.defaultText);
    }
  };

  return (
    <section className="section-cinematic border-y border-char/10 bg-bone">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-16 mb-16">
          <div className="max-w-xl">
            <p className="type-caption text-ember mb-6 font-bold">Interactive Brand Typography</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl mb-8 text-char">
              The Brand Type Tester
            </h2>
            <p className="type-serif text-xl text-stone leading-relaxed">
              Explore the typography that shapes Dan&apos;s Hamburgers digital identity. Customize font specimen parameters below.
            </p>
          </div>
          
          {/* Settings panel */}
          <div className="w-full lg:max-w-md bg-bone-warm p-8 border border-bone-dark rounded-sm space-y-6 shadow-sm">
            <div>
              <label className="type-caption text-[10px] text-stone block mb-3 font-bold">Select Typeface</label>
              <div className="grid grid-cols-3 gap-2">
                {fonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleFontChange(font.id)}
                    className={`py-3 px-2 type-caption text-[9px] text-center border transition-all duration-300 font-bold ${
                      selectedFont.id === font.id
                        ? "bg-ember text-bone border-ember"
                        : "border-bone-dark hover:border-ember hover:text-char text-stone"
                    }`}
                  >
                    {font.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider controls */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="type-caption text-[10px] text-stone">Size</span>
                  <span className="type-caption text-[10px] text-char font-bold">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-1 bg-char/10 rounded-lg appearance-none cursor-pointer accent-ember"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="type-caption text-[10px] text-stone">Spacing</span>
                  <span className="type-caption text-[10px] text-char font-bold">{letterSpacing}em</span>
                </div>
                <input
                  type="range"
                  min="-0.08"
                  max="0.3"
                  step="0.01"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full h-1 bg-char/10 rounded-lg appearance-none cursor-pointer accent-ember"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="type-caption text-[10px] text-stone">Leading</span>
                  <span className="type-caption text-[10px] text-char font-bold">{lineHeight}</span>
                </div>
                <input
                  type="range"
                  min="0.9"
                  max="1.8"
                  step="0.05"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                  className="w-full h-1 bg-char/10 rounded-lg appearance-none cursor-pointer accent-ember"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specimen display area */}
        <div className="border border-bone-dark bg-bone-warm min-h-[300px] flex flex-col justify-between p-8 md:p-12 relative group rounded-sm overflow-hidden shadow-md">
          <div className="flex flex-wrap justify-between gap-4 border-b border-bone-dark pb-6 text-smoke text-[10px] uppercase font-mono tracking-widest">
            <div>
              <span className="text-stone">Typeface: </span>
              <span className="text-char font-bold">{selectedFont.name}</span>
            </div>
            <div>
              <span className="text-stone">Origin: </span>
              <span className="text-char font-bold">{selectedFont.designer}</span>
            </div>
            <div>
              <span className="text-stone">Weight: </span>
              <span className="text-char font-bold">{selectedFont.weight}</span>
            </div>
          </div>

          <div className="py-12 md:py-16">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`w-full bg-transparent border-none outline-none resize-none overflow-hidden select-text text-char ${selectedFont.className}`}
              style={{
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}em`,
                lineHeight: lineHeight,
                height: "auto",
                minHeight: "150px",
              }}
              rows={2}
              placeholder="Type custom text..."
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-bone-dark text-stone text-xs leading-relaxed">
            <p className="max-w-xl font-body">
              {selectedFont.description}
            </p>
            <div className="flex gap-6 font-mono text-[10px]">
              <span>CHARACTERS: {text.length}</span>
              <span className="text-ember font-bold">© DAN&apos;S HAMBURGERS 1973</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
