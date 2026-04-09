import { PageShell } from "@/components/page-shell";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
