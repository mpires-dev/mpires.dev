import type { Metadata } from "next";
import { reader } from "@/lib/reader";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and projects by Matheus Pires.",
};

export default async function ProjectsPage() {
  const projects = await reader.collections.projects.all();

  const sorted = projects.sort((a, b) => {
    const dateA = new Date(a.entry.date || 0).getTime();
    const dateB = new Date(b.entry.date || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-heading text-4xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="mb-12 text-muted-foreground">
          Case studies from products I&apos;ve built and shipped.
        </p>

        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {sorted.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.entry.title}
                description={project.entry.description || ""}
                slug={project.slug}
                coverImage={project.entry.coverImage || undefined}
                techStack={project.entry.techStack || []}
                date={project.entry.date || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-muted-foreground">No projects published yet.</p>
          </div>
        )}
    </div>
  );
}
