const timelineEntries = [
  {
    period: "Apr 2025 – Present",
    title: "Senior Fullstack Engineer",
    description:
      "Leading development of a HealthTech communication product for one of the largest hospital networks in the US. Node.js + NestJS backend with WebSockets, Redis, and PostgreSQL. React/Next.js web and React Native/Expo mobile. Full AWS infrastructure with ECS + Fargate.",
    company: "TeamEx",
    initials: "TE",
  },
  {
    period: "Sep 2024 – Sep 2025",
    title: "Lead Software Engineer",
    description:
      "Spearheaded PartiuRolê from scratch — a digital ticket marketplace handling high-volume concurrent purchases. Set backend patterns with Fastify, frontend standards with Next.js, and CI/CD pipelines.",
    company: "PartiuRolê",
    initials: "PR",
  },
  {
    period: "Sep 2023 – Nov 2024",
    title: "Senior Software Engineer",
    description:
      "Built a blockchain-integrated F1 multiplayer game. Developed a 3D character customization system in the browser and the full NFT marketplace with MetaMask/crypto wallet integration using Ethers.js.",
    company: "Racino",
    initials: "RA",
  },
  {
    period: "Mar 2022 – May 2023",
    title: "Senior Software Engineer",
    description:
      "Frontend specialist processing 110M+ orders/month. Built the Logistics-as-a-Service UI with React + TypeScript, a BFF with NestJS, and the courier notification panel with automated testing.",
    company: "iFood",
    initials: "IF",
  },
  {
    period: "May 2021 – Mar 2022",
    title: "Software Engineer",
    description:
      "Owned the chat and messaging system. Architected microfrontends with React, built a reusable design system with Storybook, and led the embeddable chat widget development.",
    company: "Movidesk",
    initials: "MD",
  },
  {
    period: "Dec 2020 – May 2021",
    title: "Software Engineer",
    description:
      "Engineered real-time chat for an omnichannel support app centralizing WhatsApp, Telegram, and Instagram. React + TypeScript with Redux Saga and Azure SignalR serverless backend.",
    company: "Tech4Humans",
    initials: "T4",
  },
  {
    period: "Jan 2020 – Dec 2020",
    title: "Software Engineer",
    description:
      "Built the control panel for a server management platform (Heroku alternative) managing Linux container deployments on GCP and AWS. React + TypeScript with Storybook design system.",
    company: "Devopness",
    initials: "DV",
  },
  {
    period: "Feb 2019 – Jan 2020",
    title: "Software Engineer",
    description:
      "Developed a document management platform for environmental compliance — a private repository with admin dashboard. React + TypeScript frontend, migrated backend to Strapi headless CMS.",
    company: "Garcia Monaco",
    initials: "GM",
  },
];

export function CareerTimeline() {
  return (
    <section>
      <h2 className="mb-10 font-heading text-2xl font-medium tracking-tight md:text-3xl">
        Career <span className="text-muted-foreground">Timeline</span>
      </h2>

      <div className="space-y-0">
        {timelineEntries.map((entry) => (
          <div
            key={`${entry.period}-${entry.company}`}
            className="border-t border-border py-6 last:border-b md:py-7"
          >
            <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
              <span className="shrink-0 pt-2 font-mono text-xs tracking-wide text-muted-foreground md:w-[140px]">
                {entry.period}
              </span>

              <div className="flex size-[60px] shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                <span className="text-lg font-bold text-foreground">
                  {entry.initials}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-base font-semibold uppercase tracking-wide text-foreground md:text-lg">
                  {entry.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  {entry.description}
                </p>
              </div>

              <span className="shrink-0 pt-2 font-mono text-xs tracking-wide text-muted-foreground md:text-right">
                {entry.company}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
