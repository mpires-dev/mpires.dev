import { config, collection, fields } from "@keystatic/core";

const isGithubMode =
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID && !!process.env.KEYSTATIC_SECRET;
const repoOwner = process.env.NEXT_PUBLIC_KEYSTATIC_REPO_OWNER || "";
const repoName = process.env.NEXT_PUBLIC_KEYSTATIC_REPO_NAME || "";

export default config({
  storage: isGithubMode
    ? {
        kind: "github",
        repo: { owner: repoOwner, name: repoName },
      }
    : { kind: "local" },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        publishDate: fields.date({ label: "Publish Date" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Short Description", multiline: true }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        link: fields.url({ label: "Project Link" }),
        github: fields.url({ label: "GitHub Repo" }),
        techStack: fields.array(fields.text({ label: "Technology" }), {
          label: "Tech Stack",
          itemLabel: (props) => props.value,
        }),
        date: fields.date({ label: "Project Date" }),
        content: fields.markdoc({ label: "Case Study Content" }),
      },
    }),
    aiFiles: collection({
      label: "AI Files",
      slugField: "name",
      path: "content/ai-files/*",
      format: { contentField: "content" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        description: fields.text({ label: "Description", multiline: true }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/ai-files",
          publicPath: "/images/ai-files/",
        }),
        repoLink: fields.url({ label: "Repository Link" }),
        installCommand: fields.text({ label: "Install Command" }),
        content: fields.markdoc({ label: "Details" }),
      },
    }),
  },
});
