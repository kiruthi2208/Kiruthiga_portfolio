'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown, Phone } from 'lucide-react';
import { heroContent, personalInfo } from '@/lib/portfolio-data';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [prefersReducedMotion]);

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              {personalInfo.available && (
                <span className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  {heroContent.availability}
                </span>
              )}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent mb-4"
            >
              {heroContent.eyebrow}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              {heroContent.headline.split(' ').map((word, i) => (
                <span key={i} className={i === 4 || i === 5 ? 'gradient-text' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {heroContent.supportingCopy}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToWork}
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_30px_-5px_hsl(var(--accent)/0.5)] hover:scale-[1.02] magnetic-btn"
              >
                {heroContent.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3.5 text-sm font-semibold transition-all hover:border-accent/50 hover:bg-card"
              >
                {heroContent.secondaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <HeroVisual mousePos={mousePos} reduced={!!prefersReducedMotion} />
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
          <span className="h-1.5 w-1 rounded-full bg-current scroll-indicator-dot" />
        </div>
        <ArrowDown className="h-3 w-3" />
      </motion.button>
    </section>
  );
}

function HeroVisual({ mousePos, reduced }: { mousePos: { x: number; y: number }; reduced: boolean }) {
  const tilt = reduced ? { x: 0, y: 0 } : { x: mousePos.y * -8, y: mousePos.x * 8 };
  const float1 = reduced ? {} : { x: mousePos.x * 20, y: mousePos.y * 20 };
  const float2 = reduced ? {} : { x: mousePos.x * -15, y: mousePos.y * -15 };

  return (
    <div className="relative aspect-square max-w-lg mx-auto">
      {/* Main browser window card */}
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        className="relative w-full"
      >
        <div className="border-gradient rounded-2xl overflow-hidden shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
            </div>
            <div className="ml-2 flex-1 rounded-md bg-background/60 px-3 py-1 text-[10px] text-muted-foreground font-mono">
              localhost/kiruthiga-portfolio
            </div>
          </div>

          {/* Code content */}
          <div className="bg-card p-5 font-mono text-[11px] leading-relaxed">
            <div className="text-muted-foreground">{'// Full-Stack Developer'}</div>
            <div>
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-400">developer</span>{' '}
              <span className="text-muted-foreground">=</span>{' '}
              <span className="text-muted-foreground">{'{'}</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">name</span>
              <span className="text-muted-foreground">:</span>{' '}
              <span className="text-green-400">'Kiruthiga S'</span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">stack</span>
              <span className="text-muted-foreground">:</span>{' '}
              <span className="text-green-400">['PHP', 'MySQL', 'JS']</span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">ai_assisted</span>
              <span className="text-muted-foreground">:</span>{' '}
              <span className="text-orange-400">true</span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">available</span>
              <span className="text-muted-foreground">:</span>{' '}
              <span className="text-orange-400">true</span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div className="pl-4">
              <span className="text-cyan-400">build</span>
              <span className="text-muted-foreground">:</span>{' '}
              <span className="text-purple-400">() =&gt;</span>{' '}
              <span className="text-green-400">'solve(problems)'</span>
            </div>
            <div>
              <span className="text-muted-foreground">{'}'}</span>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <span className="text-green-400">{'>'}</span>
              <span className="animate-blink">_</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating card 1 — Database */}
      <motion.div
        animate={float1}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="absolute -left-8 top-1/4 animate-float-slow"
      >
        <div className="border-gradient rounded-xl p-3 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
              <DatabaseIcon />
            </div>
            <div>
              <div className="text-[10px] font-semibold">MySQL</div>
              <div className="text-[9px] text-muted-foreground">Database</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating card 2 — AI */}
      <motion.div
        animate={float2}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="absolute -right-6 bottom-1/4 animate-float-delayed"
      >
        <div className="border-gradient rounded-xl p-3 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
              <SparklesIcon />
            </div>
            <div>
              <div className="text-[10px] font-semibold">AI-Assisted</div>
              <div className="text-[9px] text-muted-foreground">Development</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badge — Location */}
      <motion.div
        animate={float2}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="absolute right-8 -top-4 animate-float"
      >
        <div className="rounded-full border border-border bg-card px-3 py-1.5 shadow-lg text-[10px] font-medium flex items-center gap-1.5">
          <Phone className="h-3 w-3 text-accent" />
          Namakkal, India
        </div>
      </motion.div>
    </div>
  );
}

function DatabaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
    </svg>
  );
}
