'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb, MessageSquare, Sparkles, CheckCircle, RefreshCw, Code2,
  ArrowRight, type LucideIcon,
} from 'lucide-react';
import { aiWorkflow, skills } from '@/lib/portfolio-data';

const iconMap: Record<string, LucideIcon> = {
  Lightbulb, MessageSquare, Sparkles, CheckCircle, RefreshCw, Code2,
};

const aiHighlights = [
  'Prompt Engineering',
  'Prompt Optimization',
  'AI Output Evaluation',
  'AI-Assisted Coding',
  'Debugging',
  'Problem Solving',
];

export function AISection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">AI & PROMPT ENGINEERING</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            I Don't Just Use AI.<br />I Know How to Work With It.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Generative AI has become part of my development workflow — from generating and refining code to debugging, problem-solving, content creation and exploring better implementation approaches.
          </p>
        </motion.div>

        {/* Workflow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
            {aiWorkflow.map((step, i) => {
              const Icon = iconMap[step.icon] || Sparkles;
              return (
                <div key={step.step} className="flex items-center gap-2 sm:gap-0 flex-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex flex-col items-center gap-2 flex-1 group"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border bg-secondary/50 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-wider">{step.step}</span>
                  </motion.div>
                  {i < aiWorkflow.length - 1 && (
                    <div className="hidden sm:flex items-center px-1">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Highlights & Tools */}
        <div className="grid sm:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">AI Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {aiHighlights.map((hl, i) => (
                <motion.span
                  key={hl}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-medium hover:border-accent/40 hover:bg-accent/5 transition-all cursor-default"
                >
                  {hl}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">AI Tools I Use</h3>
            <div className="flex flex-wrap gap-2">
              {skills.aiTools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-medium hover:border-accent/40 hover:bg-accent/5 transition-all cursor-default"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
