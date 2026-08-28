import * as React from "react";
import { motion } from "motion/react";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragEnd" | "onDragEnter" | "onDragExit" | "onDragLeave" | "onDragOver" | "onDragStart" | "onDrop"> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-none font-mono tracking-widest text-xs uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
      default:
        "bg-accent text-background hover:bg-accent-muted font-bold",
      outline:
        "border border-border text-foreground hover:border-accent hover:text-accent bg-transparent",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-card",
    };

    const sizes: Record<string, string> = {
      default: "h-10 px-6 text-xs",
      sm: "h-8 px-4 text-[10px]",
      lg: "h-12 px-8 text-xs",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className || ""}`}
        {...(props as any)}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
