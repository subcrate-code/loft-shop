import { cn } from "@/lib/utils";

export function Badge({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium leading-5 text-white/80 backdrop-blur-xl whitespace-normal",
        className
      )}
    >
      {children}
    </div>
  );
}
