"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;   // 👈 optional bana do
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <article className="group flex flex-col h-full rounded-2xl border border-border bg-card/80 backdrop-blur bg-clip-padding p-7 shadow-inner transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-foreground/20">
        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight text-card-foreground mb-3 leading-snug">
          {project.title}
        </h3>

        {/* Description — clamped for consistent card height */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-5">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium tracking-wide"
              style={{
                backgroundColor: "var(--badge-bg)",
                color: "var(--badge-text)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA button — pinned to bottom via mt-auto */}
        <div className="mt-auto pt-6">
          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-card-foreground underline-offset-4 hover:underline transition-colors duration-200 group-hover:text-primary"
            >
              View Project
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          ) : (
            <div>
              <span className="text-sm font-medium text-card-foreground">
                Private Project
              </span>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                This project is private due to client confidentiality. Project
                details cannot be shared without the client&apos;s permission.
              </p>
            </div>
          )}
        </div>
      </article>
    </motion.div>
  );
}