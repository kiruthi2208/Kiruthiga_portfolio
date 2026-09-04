'use client';

import { motion } from 'framer-motion';
import { Search, ClipboardList, Hammer, Rocket, type LucideIcon } from 'lucide-react';
import { process } from '@/lib/portfolio-data';

const iconMap: Record<string, LucideIcon> = {
  Search, ClipboardList, Hammer, Rocket,
};

export function Process() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">HOW I WORK</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            My Process
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {process.map((step, i) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 font-display text-7xl font-bold text-muted-foreground/5 group-hover:text-accent/10 transition-colors">
                  {step.number}
                </div>
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-base font-bold tracking-wide mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-px bg-border" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
