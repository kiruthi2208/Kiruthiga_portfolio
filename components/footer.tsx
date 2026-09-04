'use client';

import { MessageCircle, Linkedin, Mail, ArrowUp, Home } from 'lucide-react';
import { personalInfo, navLinks } from '@/lib/portfolio-data';

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-bold">
              <span>Kiruthiga S</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Full-Stack Web Developer &bull; AI-Assisted Development
            </p>
            <p className="mt-3 text-sm text-muted-foreground/80 italic max-w-sm">
              Building practical digital solutions, one project at a time.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-blue-500/40 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-accent/40 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-green-500/40 hover:text-green-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-foreground transition-colors break-all">
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:+${personalInfo.phoneInternational}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {personalInfo.phone}
                </a>
              </li>
              <li className="text-muted-foreground">{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Kiruthiga S. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
