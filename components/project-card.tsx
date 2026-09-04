'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, FolderGit2, Calendar, Server, Tag } from 'lucide-react';
import type { Project } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  const isLarge = project.large;

  return (
    <motion.button
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      onClick={() => onOpen(project)}
      data-cursor="view"
      className={cn(
        'group relative text-left rounded-2xl border border-border bg-card overflow-hidden transition-all',
        'hover:border-accent/40 hover:shadow-[0_0_40px_-10px_hsl(var(--accent)/0.2)]',
        isLarge ? 'lg:col-span-2 sm:col-span-2' : 'lg:col-span-1 sm:col-span-1'
      )}
    >
      {/* Visual area */}
      <div className={cn('relative overflow-hidden', isLarge ? 'aspect-[16/8]' : 'aspect-[16/10]')}>
        <ProjectVisual project={project} large={!!isLarge} />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          {project.confidential && <Lock className="h-3.5 w-3.5 text-amber-500" />}
          <span className={cn(
            'text-[10px] font-bold tracking-wider px-2 py-1 rounded-md',
            project.confidential
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500'
              : 'bg-accent/10 text-accent'
          )}>
            {project.badge}
          </span>
        </div>

        <h3 className={cn(
          'font-display font-bold leading-tight group-hover:text-accent transition-colors',
          isLarge ? 'text-xl sm:text-2xl' : 'text-lg'
        )}>
          {project.title}
        </h3>

        <p className={cn(
          'mt-2 text-sm text-muted-foreground leading-relaxed',
          isLarge ? 'line-clamp-3' : 'line-clamp-2'
        )}>
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, isLarge ? 5 : 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (isLarge ? 5 : 3) && (
              <span className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{project.technologies.length - (isLarge ? 5 : 3)}
              </span>
            )}
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
            <ArrowUpRight className="h-4 w-4 group-hover:rotate-0 transition-transform" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function ProjectVisual({ project, large }: { project: Project; large: boolean }) {
  if (project.confidential) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-card to-card flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
            <Lock className="h-8 w-8 text-amber-500" />
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-amber-600 dark:text-amber-500">Confidential Project</div>
            <div className="text-xs text-muted-foreground mt-0.5">Erode Government Hospital</div>
          </div>
        </div>
      </div>
    );
  }

  const gradients: Record<string, string> = {
    'internsync': 'from-blue-500/20 via-cyan-500/10 to-card',
    'finance-management': 'from-emerald-500/20 via-teal-500/10 to-card',
    'faculty-portal': 'from-purple-500/20 via-indigo-500/10 to-card',
    'books-bytes': 'from-orange-500/20 via-red-500/10 to-card',
    'hospital-management': 'from-rose-500/20 via-pink-500/10 to-card',
  };

  const grad = gradients[project.id] || 'from-accent/20 via-primary/10 to-card';
  const iconMap: Record<string, typeof FolderGit2> = {
    'internsync': FolderGit2,
    'finance-management': Server,
    'faculty-portal': Tag,
    'books-bytes': Server,
    'hospital-management': Calendar,
  };
  const Icon = iconMap[project.id] || FolderGit2;

  return (
    <div className={cn('absolute inset-0 bg-gradient-to-br', grad, 'group-hover:scale-105 transition-transform duration-500')}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative h-full flex flex-col items-center justify-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-foreground/70 group-hover:text-accent transition-colors" />
        </div>
        {large && (
          <div className="text-xs font-medium text-muted-foreground/60 font-mono px-3 py-1 rounded-md bg-background/30 backdrop-blur-sm">
            {project.technologies.join(' • ')}
          </div>
        )}
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  );
}
