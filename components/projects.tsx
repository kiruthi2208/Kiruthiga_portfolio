'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/lib/portfolio-data';
import { ProjectCard } from './project-card';
import { ProjectModal } from './project-modal';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">WORK</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Selected Work
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Real projects. Practical solutions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelected}
              index={index}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
