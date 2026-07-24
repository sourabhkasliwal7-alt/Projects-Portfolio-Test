"use client";

import { motion, type Variants } from "framer-motion";
import { ProjectCard, type Project } from "@/components/project-card";

interface ProjectSectionProps {
  id: string;
  title: string;
  blurb?: string;
  projects: Project[];
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ProjectSection({ id, title, blurb, projects }: ProjectSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-5"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          {blurb && (
            <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
          )}
        </div>
        <span className="hidden shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </span>
      </motion.div>

      {/* Responsive card grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={item} className="h-full">
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
