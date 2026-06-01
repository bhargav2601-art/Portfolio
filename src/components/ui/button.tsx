"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
  {
    variants: {
      variant: {
        primary:
          "bg-[#FF6B00] text-[#F5F7FA] shadow-[0_0_30px_rgba(255,107,0,0.35)] hover:shadow-[0_0_40px_rgba(255,107,0,0.5)] hover:scale-[1.03]",
        secondary:
          "border border-cyan-300/40 bg-cyan-500/10 text-[#F5F7FA] hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(0,209,255,0.25)]",
        ghost:
          "border border-white/15 bg-white/5 text-[#F5F7FA] backdrop-blur-xl hover:border-cyan-300/40 hover:bg-white/10",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
