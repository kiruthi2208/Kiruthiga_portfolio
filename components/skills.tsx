'use client';

import { motion } from 'framer-motion';
import { Code2, Globe, Sparkles, Wrench, type LucideIcon } from 'lucide-react';
import { skills } from '@/lib/portfolio-data';

const categories: {
  label: string;
  icon: LucideIcon;
  items: string[];
  accent: string;
}[] = [
  { label: 'Programming Languages', icon: Code2, items: skills.programming, accent: 'text-cyan-400' },
  { label: 'Web & Database', icon: Globe, items: skills.web, accent: 'text-blue-400' },
  { label: 'AI & Prompt Engineering', icon: Sparkles, items: skills.ai, accent: 'text-emerald-400' },
  { label: 'AI Tools', icon: Sparkles, items: skills.aiTools, accent: 'text-orange-400' },
  { label: 'Tools & Platforms', icon: Wrench, items: skills.tools, accent: 'text-purple-400' },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">SKILLS</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Technologies I Work With
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold">{cat.label}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.08 + si * 0.04 }}
                      className="group relative cursor-default rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium transition-all hover:border-accent/40 hover:bg-accent/5 hover:shadow-sm"
                    >
                      <span className="transition-colors">{skill}</span>
                      <span className="absolute inset-0 rounded-lg ring-1 ring-accent/0 group-hover:ring-accent/20 transition-all" />
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
