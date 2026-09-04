'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CheckCircle2, Wrench, Lightbulb, Target, Rocket, User, Cpu } from 'lucide-react';
import type { Project } from '@/lib/portfolio-data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header with visual */}
            <div className="relative h-44 sm:h-56 overflow-hidden rounded-t-2xl">
              <ModalVisual project={project} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {project.confidential && <Lock className="h-4 w-4 text-amber-500" />}
                  <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded-md ${
                    project.confidential
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {project.badge}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold">{project.title}</h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
                {project.confidential && (
                  <p className="mt-3 text-xs text-amber-600 dark:text-amber-500/80 italic">
                    Due to confidentiality, the live system and implementation details are not publicly available.
                  </p>
                )}
              </div>

              {/* Problem & Solution */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold">Problem</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{project.problem}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold">Solution</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold">Features</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology */}
              {!project.confidential && project.technologies.length > 0 && project.technologies[0] !== 'Confidential' && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold">Technology</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Role & Approach */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold">Role</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{project.role}</p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold">Development Approach</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{project.approach}</p>
                </div>
              </div>

              {!project.confidential && (
                <button
                  onClick={() => {
                    onClose();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Rocket className="h-4 w-4" />
                  Discuss a Similar Project
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalVisual({ project }: { project: Project }) {
  if (project.confidential) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-card to-card flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative flex flex-col items-center gap-2">
          <Lock className="h-10 w-10 text-amber-500" />
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-500">Confidential</span>
        </div>
      </div>
    );
  }
  const gradients: Record<string, string> = {
    'internsync': 'from-blue-500/25 via-cyan-500/15 to-card',
    'finance-management': 'from-emerald-500/25 via-teal-500/15 to-card',
    'faculty-portal': 'from-purple-500/25 via-indigo-500/15 to-card',
    'books-bytes': 'from-orange-500/25 via-red-500/15 to-card',
    'hospital-management': 'from-rose-500/25 via-pink-500/15 to-card',
  };
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[project.id] || 'from-accent/20 via-primary/10 to-card'}`}>
      <div className="absolute inset-0 bg-grid opacity-20" />
    </div>
  );
}
