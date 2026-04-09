import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="content-wrap py-12">
      <Skeleton className="h-20 w-2/3" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
