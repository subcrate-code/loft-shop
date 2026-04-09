import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-[52px] w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-base text-white outline-none transition placeholder:text-white/35 focus:border-white/20 focus:bg-white/8 sm:text-sm",
        className
      )}
      {...props}
    />
  );
});
