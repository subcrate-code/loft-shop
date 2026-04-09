import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/35 focus:border-white/20 focus:bg-white/8 sm:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);
