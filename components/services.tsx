'use client';

import { motion } from 'framer-motion';
import {
  Globe, LayoutTemplate, Code2, Database, ShoppingCart, RefreshCw, Sparkles,
  ArrowUpRight, type LucideIcon,
} from 'lucide-react';
import { services } from '@/lib/portfolio-data';

const iconMap: Record<string, LucideIcon> = {
  Globe, LayoutTemplate, Code2, Database, ShoppingCart, RefreshCw, Sparkles,
};

export function Services() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">SERVICES</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            What I Can Build For You
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden transition-all hover:border-accent/40 hover:shadow-[0_0_30px_-10px_hsl(var(--accent)/0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="font-display text-3xl font-bold text-muted-foreground/15 group-hover:text-accent/20 transition-colors">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors"
                  >
                    Discuss Your Project
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
