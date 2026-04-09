import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-white text-slate-950 shadow-glow hover:-translate-y-0.5 hover:bg-white/95 active:translate-y-0 disabled:bg-white/60",
  secondary:
    "border border-white/12 bg-white/[0.06] text-white hover:border-white/22 hover:bg-white/[0.1] active:bg-white/[0.08]",
  ghost: "text-white/70 hover:bg-white/8 hover:text-white",
  danger: "bg-danger/15 text-red-100 hover:bg-danger/20"
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-10 rounded-xl px-4 text-sm",
  md: "h-12 rounded-[18px] px-5 text-[15px]",
  lg: "h-14 rounded-[20px] px-6 text-base"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex touch-manipulation items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
