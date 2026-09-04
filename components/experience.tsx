'use client';

import { motion } from 'framer-motion';
import { Briefcase, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experience, certifications } from '@/lib/portfolio-data';

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">EXPERIENCE</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Where I've Worked
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card z-10">
                    <Briefcase className="h-3.5 w-3.5 text-accent" />
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-accent/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold">{exp.company}</h3>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-accent mb-3">{exp.role}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    {exp.points && (
                      <div className="space-y-1.5 mb-4">
                        {exp.points.map((pt) => (
                          <div key={pt} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent/60" />
                            {pt}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-5">
                <Award className="h-5 w-5 text-accent" />
                <h3 className="text-base font-semibold">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Award className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium leading-tight">{cert.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Namakkal, Tamil Nadu, India
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
