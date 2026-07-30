import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { reader } from "@/lib/reader";
import { ProjectCard } from "@/components/project-card";
import { AiFileCard } from "@/components/ai-file-card";
import { CareerTimeline } from "@/components/career-timeline";
import { DitherBackground } from "@/components/dither-background";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Homepage() {
  const projects = await reader.collections.projects.all();
  const aiFiles = await reader.collections.aiFiles.all();

  const recentAiFiles = aiFiles.slice(0, 3);
  const recentProjects = projects
    .sort((a, b) => {
      const dateA = new Date(a.entry.date || 0).getTime();
      const dateB = new Date(b.entry.date || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 4);

  return (
    <ScrollArea scrollFade className="h-svh">
      <div className="pointer-events-none absolute left-0 top-0 h-[700px] w-full opacity-40">
        <DitherBackground
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={false}
          colorNum={10}
          waveAmplitude={0.3}
          waveFrequency={2.7}
          waveSpeed={0.04}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative flex min-h-[500px] max-w-3xl flex-col justify-center gap-4">
          <h1 className="relative z-20 text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Hi, I&apos;m Matheus Pires — a Fullstack Developer focused on
            high-growth digital products.
          </h1>
          <p className="relative z-20 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I specialize in the TypeScript ecosystem and AI product execution.
            I partner with teams to ship faster, scale smarter, and build
            experiences that directly impact revenue.
          </p>
          <div className="relative z-20 flex flex-wrap gap-3">
            <Button
              render={<Link href="mailto:matheuspires.dev@gmail.com" />}
              size="lg"
            >
              <Mail className="size-4" />
              Email
            </Button>
            <Button
              render={
                <Link
                  href="https://www.linkedin.com/in/mpiresdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
              size="lg"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </Button>
            <Button render={<Link href="/projects" />} variant="ghost" size="lg">
              Projects
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>

        {/* Projects */}
        <section className="relative mt-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
              Case studies
            </h2>
            <Button
              variant="link"
              size="sm"
              render={<Link href="/projects" />}
              className="hidden items-center gap-2 md:flex"
            >
              View all projects <ArrowRight className="size-4" />
            </Button>
          </div>

          {recentProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {recentProjects.map((project) => (
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
              <Button
                variant="link"
                render={<Link href="/keystatic" />}
                className="mt-4"
              >
                Open content panel
              </Button>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button
              variant="link"
              render={<Link href="/projects" />}
              className="inline-flex items-center gap-2"
            >
              View all <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>

        {/* AI Files */}
        <section className="relative mt-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
                AI Files
              </h2>
              <p className="mt-2 text-muted-foreground">
                Open source AI skills, agents and tools — free to use and remix.
              </p>
            </div>
            <Button
              variant="link"
              size="sm"
              render={<Link href="/ai-files" />}
              className="hidden shrink-0 items-center gap-2 md:flex"
            >
              View all <ArrowRight className="size-4" />
            </Button>
          </div>

          {recentAiFiles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentAiFiles.map((file) => (
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
              <Button
                variant="link"
                render={<Link href="/keystatic" />}
                className="mt-4"
              >
                Open content panel
              </Button>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button
              variant="link"
              render={<Link href="/ai-files" />}
              className="inline-flex items-center gap-2"
            >
              View all <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="relative mt-24">
          <CareerTimeline />
        </section>
      </div>
    </ScrollArea>
  );
}
