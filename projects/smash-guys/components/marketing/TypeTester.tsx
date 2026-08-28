"use client";

import { useState } from "react";

const fonts = [
  {
    id: "smash-display",
    name: "Smash Display",
    className: "font-display",
    designer: "Smash Guys Atelier",
    weight: "700 (Bold)",
    description: "Punchy, expressive display face representing the caramelized, griddle-pressed crust of our signature patties.",
    defaultText: "SMASH GUYS: THE ART OF THE CRUST",
  },
  {
    id: "truffle-garamond",
    name: "Truffle Garamond",
    className: "font-serif italic",
    designer: "Cuisine Craft",
    weight: "400 (Regular Italic)",
    description: "Refined, high-contrast serif expressing the delicate, luxurious balance of truffle oil, gruyère, and arugula.",
    defaultText: "A study in flavor and editorial precision.",
  },
  {
    id: "atelier-mono",
    name: "Atelier Mono",
    className: "font-sans uppercase",
    designer: "Bangalore Lab",
    weight: "400 (Regular)",
    description: "Technical, industrial monospaced face mapping the exact temperature, weight, and timing of our culinary griddle.",
    defaultText: "TEMP: 230C | WEIGHT: 120G | TIME: 140S",
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
    <section className="section-cinematic border-y border-ink/5 bg-cream">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-16 mb-16">
          <div className="max-w-xl">
            <p className="type-caption text-gold mb-6">Interactive Showcase</p>
            <h2 className="type-display text-4xl md:text-5xl lg:text-6xl mb-8 text-ink">
              The Type Tester
            </h2>
            <p className="type-serif text-xl text-stone leading-relaxed">
              Every detail is designed. Experience the typefaces that shape our culinary brand identity. Edit the text below and customize the specimen parameters.
            </p>
          </div>
          
          {/* Settings panel */}
          <div className="w-full lg:max-w-md bg-cream-dark/40 p-8 border border-ink/5 rounded-sm space-y-6">
            <div>
              <label className="type-caption text-[10px] text-stone block mb-3">Select Specimen</label>
              <div className="grid grid-cols-3 gap-2">
                {fonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleFontChange(font.id)}
                    className={`py-3 px-2 type-caption text-[9px] text-center border transition-all duration-300 ${
                      selectedFont.id === font.id
                        ? "bg-ink text-cream border-ink"
                        : "border-ink/10 hover:border-ink hover:text-ink text-stone"
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
                  <span className="type-caption text-[10px] text-ink">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="type-caption text-[10px] text-stone">Spacing</span>
                  <span className="type-caption text-[10px] text-ink">{letterSpacing}em</span>
                </div>
                <input
                  type="range"
                  min="-0.08"
                  max="0.3"
                  step="0.01"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="type-caption text-[10px] text-stone">Leading</span>
                  <span className="type-caption text-[10px] text-ink">{lineHeight}</span>
                </div>
                <input
                  type="range"
                  min="0.9"
                  max="1.8"
                  step="0.05"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                  className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specimen display area */}
        <div className="border border-ink/10 bg-cream-warm min-h-[300px] flex flex-col justify-between p-8 md:p-12 relative group rounded-sm overflow-hidden" data-cursor="test it">
          {/* Metadata overlay */}
          <div className="flex flex-wrap justify-between gap-4 border-b border-ink/5 pb-6 text-mist text-[10px] uppercase font-sans tracking-widest">
            <div>
              <span className="text-stone">Atelier Font: </span>
              <span className="text-ink font-bold">{selectedFont.name}</span>
            </div>
            <div>
              <span className="text-stone">Designer: </span>
              <span className="text-ink font-bold">{selectedFont.designer}</span>
            </div>
            <div>
              <span className="text-stone">Format: </span>
              <span className="text-ink font-bold">{selectedFont.weight}</span>
            </div>
          </div>

          {/* Editable text area */}
          <div className="py-12 md:py-16">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`w-full bg-transparent border-none outline-none resize-none overflow-hidden select-text text-ink ${selectedFont.className}`}
              style={{
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}em`,
                lineHeight: lineHeight,
                height: "auto",
                minHeight: "150px",
              }}
              rows={2}
              placeholder="Type custom specimen text..."
            />
          </div>

          {/* Details footer */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-ink/5 text-stone text-xs leading-relaxed">
            <p className="max-w-xl font-body">
              {selectedFont.description}
            </p>
            <div className="flex gap-6 font-sans text-[10px]">
              <span>CHARACTERS: {text.length}</span>
              <span className="text-gold">© EST 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
