import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogLoading() {
  return (
    <div className="content-wrap py-12">
      <Skeleton className="h-16 w-2/3" />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Skeleton className="h-[420px]" />
        <Skeleton className="h-[420px]" />
        <Skeleton className="h-[420px]" />
        <Skeleton className="h-[420px]" />
      </div>
    </div>
  );
}
