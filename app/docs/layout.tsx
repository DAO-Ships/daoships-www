import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { Breadcrumb, DocsPager } from "@/components/docs/DocsPager";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="section py-10">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <DocsSidebar />
        <article className="prose-dao min-w-0">
          <Breadcrumb />
          {children}
          <DocsPager />
        </article>
      </div>
    </div>
  );
}
