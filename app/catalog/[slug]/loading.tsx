import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="content-wrap py-12">
      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <Skeleton className="h-16 w-48" />
          <Skeleton className="h-28 w-full" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </div>
        </div>
        <Skeleton className="h-[720px]" />
      </div>
    </div>
  );
}
