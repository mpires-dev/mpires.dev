import type { MetadataRoute } from "next";
import { reader } from "@/lib/reader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ai-files`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const [projects, aiFiles, posts] = await Promise.all([
    reader.collections.projects.list(),
    reader.collections.aiFiles.list(),
    reader.collections.posts.list(),
  ]);

  const projectRoutes: MetadataRoute.Sitemap = projects.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const aiFileRoutes: MetadataRoute.Sitemap = aiFiles.map((slug) => ({
    url: `${siteUrl}/ai-files/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((slug) => ({
    url: `${siteUrl}/posts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...aiFileRoutes, ...postRoutes];
}
