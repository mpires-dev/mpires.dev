import type { Metadata } from "next";
import { reader } from "@/lib/reader";
import { AiFileCard } from "@/components/ai-file-card";

export const metadata: Metadata = {
  title: "AI Files",
  description: "Open source AI skills, agents and tools by Matheus Pires.",
};

export default async function AiFilesPage() {
  const aiFiles = await reader.collections.aiFiles.all();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-heading text-4xl font-bold tracking-tight">
          AI Files
        </h1>
        <p className="mb-12 text-muted-foreground">
          Open source AI skills, agents and tools — free to use and remix.
        </p>

        {aiFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiFiles.map((file) => (
              <AiFileCard
                key={file.slug}
                name={file.entry.name}
                description={file.entry.description || ""}
                slug={file.slug}
                coverImage={file.entry.coverImage || undefined}
                repoLink={file.entry.repoLink || undefined}
                installCommand={file.entry.installCommand || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-4xl">🤖</p>
            <p className="mt-3 text-muted-foreground">
              No AI files published yet.
            </p>
          </div>
        )}
    </div>
  );
}
