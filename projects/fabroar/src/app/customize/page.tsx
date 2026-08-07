"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, RotateCcw, Check, Plus, Image as ImageIcon, AlertTriangle, X, ShieldCheck, Trash2 } from "lucide-react";
import NavigationBar from "@/components/ui/NavigationBar";
import Footer from "@/components/sections/Footer";
import DoodleBackground from "@/components/ui/DoodleBackground";
import TShirtMockup from "@/components/customize/TShirtMockup";
import { useCustomizationStore, calculateCustomPrice, type BaseStyle, type ShirtColor, type Placement } from "@/hooks/useCustomizationStore";
import { useCartStore } from "@/hooks/useCartStore";

const BASE_STYLES: { id: BaseStyle; label: string; price: number }[] = [
  { id: "classic-crew", label: "Classic Crewneck", price: 599 },
  { id: "oversized", label: "Oversized", price: 649 },
  { id: "slim-fit", label: "Slim Fit", price: 599 },
  { id: "relaxed", label: "Relaxed", price: 599 },
];

const COLORS: { id: ShirtColor; hex: string; label: string }[] = [
  { id: "obsidian", hex: "#1a1a1a", label: "Obsidian" },
  { id: "bone", hex: "#f5f0e8", label: "Bone" },
  { id: "sage", hex: "#8a9e8d", label: "Sage" },
  { id: "terracotta", hex: "#c4714a", label: "Terracotta" },
  { id: "indigo", hex: "#3d4f7c", label: "Indigo" },
  { id: "sand", hex: "#d4c4a0", label: "Sand" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const PLACEMENTS: { id: Placement; label: string; surcharge: number }[] = [
  { id: "left-chest", label: "Left Chest", surcharge: 0 },
  { id: "center-chest", label: "Center Chest", surcharge: 50 },
  { id: "full-back", label: "Full Back", surcharge: 150 },
  { id: "sleeve", label: "Sleeve", surcharge: 0 },
];

export default function CustomStudioPage() {
  const [step, setStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showAdvisoryModal, setShowAdvisoryModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    baseStyle,
    color,
    size,
    quantity,
    design,
    setBaseStyle,
    setColor,
    setSize,
    setQuantity,
    setDesign,
    reset,
  } = useCustomizationStore();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const totalPrice = calculateCustomPrice({ baseStyle, color, size, quantity, design });

  const handleOpenAdvisoryModal = () => {
    setUploadError(null);
    setShowAdvisoryModal(true);
  };

  const handleConfirmAndChooseFile = () => {
    setShowAdvisoryModal(false);
    setStep(2);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const handleRemoveSticker = () => {
    setDesign({
      file: null,
      preview: "",
    });
    setUploadError(null);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadError(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (!file.type.startsWith("image/") && !file.name.match(/\.(png|jpe?g|svg|webp|gif|bmp)$/i)) {
      setUploadError("Please upload an image file (PNG, JPG, SVG, or WEBP)");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("File size must be under 15MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setDesign({
        file,
        preview: e.target?.result as string,
      });
      setStep(2);
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    addItem({
      productId: `custom-${baseStyle}-${Date.now()}`,
      name: `Custom ${BASE_STYLES.find((s) => s.id === baseStyle)?.label}`,
      price: totalPrice,
      image: design.preview || "/images/animal-1.webp",
      size,
      color: COLORS.find((c) => c.id === color)?.label || color,
    });
    openCart();
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      reset();
      setStep(1);
    }, 2500);
  };

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return design.file !== null;
    if (step === 3) return true;
    return true;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Universal Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.png,.jpg,.jpeg,.svg,.webp"
        onChange={handleFileInput}
        className="hidden"
      />

      <NavigationBar />

      {/* ADVISORY MODAL BEFORE UPLOAD */}
      {showAdvisoryModal && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowAdvisoryModal(false)}
        >
          <div
            className="bg-[#0F0F0F] border border-[#D4654A]/40 text-[#F5F0E8] rounded-md max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAdvisoryModal(false)}
              className="absolute top-4 right-4 p-1.5 text-[#F5F0E8]/70 hover:text-[#D4654A] transition-colors rounded-full hover:bg-[#D4654A]/10"
              aria-label="Close advisory"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#D4654A] text-[#F5F0E8] flex items-center justify-center font-bold flex-shrink-0 shadow">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#F5F0E8]">
                  Sticker Printing Guidelines & Advisory
                </h3>
                <p className="font-ui text-xs text-[#C4A77D] uppercase tracking-wider">
                  Important details before uploading your artwork
                </p>
              </div>
            </div>

            <div className="space-y-3.5 bg-[#181514] p-4 rounded border border-[#D4654A]/30 text-sm font-body leading-relaxed mb-6">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-[#D4654A]">1.</span>
                <p className="text-[#F5F0E8]/95">
                  <strong>Background-Less Image Recommended:</strong> For optimal print quality without rectangular box borders on your tee, please upload a <strong>transparent background PNG or SVG</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-[#D4654A]">2.</span>
                <p className="text-[#F5F0E8]/95">
                  <strong>High Resolution:</strong> Recommended artwork resolution of 1000×1000 pixels or higher for sharp, vivid prints.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-[#D4654A]">3.</span>
                <p className="text-[#F5F0E8]/95">
                  <strong>Copyright & Ownership:</strong> Please make sure you own or have permission to use the uploaded logo or artwork.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-[#D4654A]">4.</span>
                <p className="text-[#F5F0E8]/95">
                  <strong>Supported Formats:</strong> PNG, JPG, JPEG, WEBP, SVG up to 15MB file size limit.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowAdvisoryModal(false)}
                className="px-5 py-3.5 border border-[#D4654A]/40 text-[#F5F0E8] font-ui text-xs font-bold uppercase rounded-sm hover:bg-[#D4654A]/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAndChooseFile}
                className="flex-1 py-3.5 bg-[#D4654A] text-[#F5F0E8] font-ui text-xs tracking-widest uppercase font-bold hover:bg-[#E07A60] transition-all rounded-sm shadow-lg flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                I Understand — Choose File Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-28 pb-10 md:pt-36 md:pb-14 bg-[#0F0F0F] text-[#F5F0E8] relative z-10">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-ui text-sm text-[#C4A77D] hover:text-[#D4654A] transition-colors duration-300 mb-6"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="font-display text-display-lg tracking-tight mb-3 text-[#F5F0E8]">
            Custom Design Studio
          </h1>
          <p className="font-body text-lg md:text-xl text-[#C4A77D] max-w-2xl leading-relaxed">
            Upload your artwork or logo, choose your fit, and we'll print it on pure cotton.
          </p>

          {/* Step Progress */}
          <div className="mt-8 flex items-center gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center font-ui text-xs font-bold transition-all duration-300 ${
                    step >= s
                      ? "border-[#D4654A] bg-[#D4654A] text-[#F5F0E8]"
                      : "border-[#D4654A]/30 text-[#C4A77D]"
                  }`}
                >
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-px w-12 transition-colors duration-300 ${
                      step > s ? "bg-[#D4654A]" : "bg-[#D4654A]/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="pb-16 md:pb-24 bg-[#0F0F0F] text-[#F5F0E8] relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Preview */}
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
              <TShirtMockup
                color={color}
                design={design}
                onUpdateDesign={setDesign}
                onSelectSampleSticker={(src: string) => {
                  setDesign({
                    file: new File(["sample"], "sample-graphic.png", { type: "image/png" }),
                    preview: src,
                  });
                }}
                onTriggerUpload={handleOpenAdvisoryModal}
                onRemoveSticker={handleRemoveSticker}
              />

              <div className="flex items-center justify-between p-4 bg-white/10 border border-white/20 mt-4 rounded-sm">
                <div>
                  <span className="font-ui text-xs text-white uppercase font-bold block">
                    {BASE_STYLES.find((s) => s.id === baseStyle)?.label} • Size {size}
                  </span>
                  <span className="font-ui text-xs text-white/80">
                    Base: ₹{BASE_STYLES.find((s) => s.id === baseStyle)?.price || 599}
                    {design.preview && " + Custom Print: ₹150"}
                  </span>
                </div>
                <span className="font-display text-2xl text-white font-bold">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-8">
              {/* Step 1: Base */}
              {step === 1 && (
                <div>
                  <h3 className="font-ui text-sm tracking-widest uppercase text-white font-bold mb-6">
                    Step 1 — Choose Fit & Garment Size
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <span className="font-ui text-xs tracking-widest uppercase text-white/80 block mb-3">
                        Style / Cut
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {BASE_STYLES.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setBaseStyle(style.id)}
                            className={`px-4 py-4 border text-left font-ui text-sm transition-all duration-300 rounded-sm ${
                              baseStyle === style.id
                                ? "border-white bg-white text-[#D4654A] font-bold shadow-md"
                                : "border-white/30 text-white hover:border-white hover:bg-white/10"
                            }`}
                          >
                            {style.label}
                            <span className="block text-xs mt-1 opacity-80">
                              ₹{style.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-ui text-xs tracking-widest uppercase text-white/80 block mb-3">
                        Color
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {COLORS.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setColor(c.id)}
                            className={`w-11 h-11 rounded-full border-2 transition-all duration-300 ${
                              color === c.id
                                ? "border-white scale-110 shadow-lg ring-2 ring-white/50"
                                : "border-transparent hover:border-white/60"
                            }`}
                            style={{ backgroundColor: c.hex }}
                            aria-label={c.label}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-ui text-xs tracking-widest uppercase text-white/80 block mb-3">
                        Size: <span className="text-white font-bold">{size}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {SIZES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`min-w-[3.2rem] px-4 py-3 border font-ui text-sm tracking-wide rounded-sm transition-all duration-300 ${
                              size === s
                                ? "border-white bg-white text-[#D4654A] font-bold shadow-md"
                                : "border-white/30 text-white hover:border-white hover:bg-white/10"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Upload Design */}
              {step === 2 && (
                <div>
                  <h3 className="font-ui text-sm tracking-widest uppercase text-white font-bold mb-4">
                    Step 2 — Upload Custom Image / Artwork
                  </h3>
                  
                  {/* Advisory Notice Box */}
                  <div className="mb-5 p-4 bg-black/25 border border-white/30 rounded-sm text-left flex items-start gap-3 shadow">
                    <AlertTriangle size={22} className="text-white flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 font-ui text-xs text-white/95">
                      <strong className="text-white uppercase tracking-wider block font-bold">
                        Sticker Upload Printing Advisory:
                      </strong>
                      <p className="leading-relaxed">
                        • For optimal print quality, please upload a <strong>transparent background-less image</strong> (PNG or SVG format).<br />
                        • High resolution (at least 1000×1000px) recommended.<br />
                        • Supports PNG, JPG, JPEG, WEBP, SVG up to 15MB.
                      </p>
                    </div>
                  </div>

                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleOpenAdvisoryModal}
                    className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all duration-300 ${
                      dragActive
                        ? "border-white bg-white/20 scale-[1.01]"
                        : "border-white/40 bg-white/5 hover:border-white hover:bg-white/10"
                    }`}
                  >
                    <Upload size={36} className="mx-auto text-white mb-3 animate-bounce" />
                    <p className="font-body text-white font-bold text-base md:text-lg">
                      Click or Drag & Drop to Upload Artwork
                    </p>
                    <p className="font-ui text-xs text-white/80 mt-1">
                      PNG, JPG, JPEG, SVG, WEBP — Up to 15MB
                    </p>

                    {design.file && (
                      <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 bg-white text-[#D4654A] font-ui text-xs font-bold rounded-sm shadow">
                        <Check size={14} />
                        <span>Uploaded: {design.file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSticker();
                          }}
                          className="ml-2 p-1 text-[#D4654A] hover:text-black transition-colors rounded hover:bg-black/10"
                          title="Remove sticker"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <p className="mt-3 font-ui text-xs text-amber font-bold bg-black/30 p-2.5 rounded border border-amber/40">
                      ⚠️ {uploadError}
                    </p>
                  )}

                  <div className="mt-6">
                    <span className="font-ui text-xs tracking-widest uppercase text-white/80 block mb-3">
                      Print Placement
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {PLACEMENTS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setDesign({ placement: p.id })}
                          className={`px-4 py-3 border text-left font-ui text-sm rounded-sm transition-all duration-300 ${
                            design.placement === p.id
                              ? "border-white bg-white text-[#D4654A] font-bold shadow-md"
                              : "border-white/30 text-white hover:border-white hover:bg-white/10"
                          }`}
                        >
                          {p.label}
                          {p.surcharge > 0 && (
                            <span className="block text-xs opacity-80">
                              +₹{p.surcharge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Quantity */}
              {step === 3 && (
                <div>
                  <h3 className="font-ui text-sm tracking-widest uppercase text-white font-bold mb-6">
                    Step 3 — Order Quantity
                  </h3>
                  <div>
                    <label className="font-ui text-xs tracking-widest uppercase text-white/80 block mb-3">
                      Quantity (Pieces)
                    </label>
                    <div className="flex items-center gap-4 bg-white/10 p-3 rounded border border-white/20 max-w-xs">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-white/40 rounded flex items-center justify-center font-bold text-white hover:bg-white hover:text-[#D4654A] transition-colors"
                      >
                        -
                      </button>
                      <span className="font-ui text-lg font-bold text-white px-4">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border border-white/40 rounded flex items-center justify-center font-bold text-white hover:bg-white hover:text-[#D4654A] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    {quantity >= 5 && (
                      <p className="font-ui text-xs text-white/90 mt-3 font-semibold">
                        ✨ Bulk order discount applied!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Summary & Add to Cart */}
              {step === 4 && (
                <div>
                  <h3 className="font-ui text-sm tracking-widest uppercase text-white font-bold mb-6">
                    Step 4 — Review & Add to Cart
                  </h3>
                  <div className="bg-white/10 border border-white/20 p-6 rounded-sm space-y-4">
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-white/80 font-ui text-sm">Style</span>
                      <span className="font-bold text-white font-ui text-sm">
                        {BASE_STYLES.find((s) => s.id === baseStyle)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-white/80 font-ui text-sm">Size</span>
                      <span className="font-bold text-white font-ui text-sm">{size}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-white/80 font-ui text-sm">Placement</span>
                      <span className="font-bold text-white font-ui text-sm">
                        {PLACEMENTS.find((p) => p.id === design.placement)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-3">
                      <span className="text-white/80 font-ui text-sm">Quantity</span>
                      <span className="font-bold text-white font-ui text-sm">{quantity} pcs</span>
                    </div>
                    <div className="flex justify-between pt-2 text-lg font-bold">
                      <span className="text-white font-ui">Total Price</span>
                      <span className="text-white font-display text-2xl">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Controls */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-4 border border-white/40 text-white font-ui text-xs tracking-widest uppercase hover:bg-white hover:text-[#D4654A] transition-colors rounded-sm font-bold"
                  >
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="flex-1 py-4 bg-white text-[#D4654A] font-ui text-xs tracking-widest uppercase font-bold hover:bg-white/90 transition-all rounded-sm shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                    className="flex-1 py-4 bg-white text-[#D4654A] font-ui text-xs tracking-widest uppercase font-bold hover:bg-white/90 transition-all rounded-sm shadow-lg"
                  >
                    {addedToCart ? "Added to Cart! ✓" : `Add Custom Tee to Cart — ₹${totalPrice.toLocaleString("en-IN")}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
