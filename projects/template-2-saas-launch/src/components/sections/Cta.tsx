"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <div className="grid-pattern absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-foreground tracking-tight mb-6">
            Ready to build the
            <br />
            <span className="text-primary">impossible?</span>
          </h2>
          <p className="text-lg text-foreground/60 mb-10 max-w-xl mx-auto">
            Start deploying in minutes. Scale to millions without touching infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" className="group rounded-none">
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="text-foreground border-foreground/10 hover:bg-foreground/[0.06] rounded-none">
              Schedule demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-foreground/40">
            No credit card required. 14-day free trial on all plans.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
