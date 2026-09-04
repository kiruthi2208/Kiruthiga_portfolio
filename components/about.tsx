'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Code2, Sparkles, FolderGit2, Wrench } from 'lucide-react';
import { aboutContent, personalInfo } from '@/lib/portfolio-data';

const highlightIcons = [Code2, Sparkles, FolderGit2, Wrench];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">ABOUT</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {aboutContent.heading}
          </h2>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {aboutContent.paragraphs.map((para, i) => (
              <p key={i} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}

            <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              {personalInfo.location}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {aboutContent.highlights.map((hl, i) => {
                const Icon = highlightIcons[i] || Code2;
                return (
                  <motion.div
                    key={hl.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="border-gradient rounded-xl p-4 group hover:shadow-lg transition-shadow"
                  >
                    <Icon className="h-5 w-5 text-accent mb-3" />
                    <div className="text-xs text-muted-foreground mb-1">{hl.label}</div>
                    <div className="text-sm font-semibold leading-tight">{hl.value}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="border-gradient rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-accent" />
                <h3 className="text-sm font-semibold tracking-wide uppercase">Education</h3>
              </div>
              <div className="space-y-4">
                {aboutContent.education.map((edu, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-accent/30">
                    <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-accent" />
                    <div className="text-sm font-semibold">{edu.degree}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{edu.institution}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
