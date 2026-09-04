'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, MessageCircle, Linkedin, Mail, Phone, Copy, Check, AlertCircle,
} from 'lucide-react';
import { personalInfo, projectTypes, budgetRanges } from '@/lib/portfolio-data';

type PrefillData = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

export function Contact({ prefillTrigger }: { prefillTrigger?: number }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    if (prefillTrigger === undefined || prefillTrigger <= 0) return;
    try {
      const raw = sessionStorage.getItem('kiri-inquiry');
      if (!raw) return;
      const data: PrefillData = JSON.parse(raw);
      setFormData((prev) => ({
        name: data.name || prev.name,
        email: data.email || prev.email,
        projectType: data.projectType || prev.projectType,
        budget: data.budget || prev.budget,
        message: data.message || prev.message,
      }));
      sessionStorage.removeItem('kiri-inquiry');
    } catch {
      // ignore parse errors
    }
  }, [prefillTrigger]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Please enter your name';
    if (!formData.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email';
    if (!formData.projectType) e.projectType = 'Please select a project type';
    if (!formData.message.trim()) e.message = 'Please enter a message';
    else if (formData.message.length > 2000) e.message = 'Message must be under 2000 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessageBody = () => {
    return [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Project Type: ${formData.projectType}`,
      `Budget: ${formData.budget || 'Not specified'}`,
      `Message: ${formData.message}`,
    ].join('\n');
  };

  const handleSubmit = (ev: React.FormEvent, channel: 'email' | 'whatsapp') => {
    ev.preventDefault();
    if (!validate()) return;

    const body = buildMessageBody();

    if (channel === 'email') {
      const subject = `New Project Inquiry — ${formData.name} — ${formData.projectType}`;
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    } else {
      const waText = `New Project Inquiry\n\n${body}`;
      const waUrl = `${personalInfo.whatsapp}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" aria-hidden="true" />

      {/* Freelance CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16 text-center"
        >
          <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px]" />

          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Have an idea? Let's build it.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
              Whether you need a business website, landing page or custom web application, I can help turn your requirements into a practical digital solution.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_30px_-5px_hsl(var(--accent)/0.5)] hover:scale-[1.02]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_clicked"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3.5 text-sm font-semibold transition-all hover:border-accent/50"
              >
                <MessageCircle className="h-4 w-4 text-green-500" />
                Chat on WhatsApp
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-track="linkedin_clicked"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3.5 text-sm font-semibold transition-all hover:border-accent/50"
              >
                <Linkedin className="h-4 w-4 text-blue-500" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact form + info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-accent mb-3">CONTACT</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                Let's Talk
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Tell me about your project and I'll get back to you with how I can help.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {/* Email */}
              <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium truncate block hover:text-accent transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:border-accent/40 transition-colors"
                  aria-label="Copy email"
                >
                  {copied === 'email' ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                </button>
              </div>

              {/* Phone */}
              <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <a href={`tel:+${personalInfo.phoneInternational}`} className="text-sm font-medium hover:text-accent transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:border-accent/40 transition-colors"
                  aria-label="Copy phone number"
                >
                  {copied === 'phone' ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-green-500/40 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <div className="text-sm font-medium">Chat directly</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-green-500 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-blue-500/40 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Linkedin className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">LinkedIn</div>
                  <div className="text-sm font-medium">Connect professionally</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-blue-500 transition-all" />
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            id="contact-form"
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <form onSubmit={(ev) => ev.preventDefault()} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Name" error={errors.name}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    maxLength={100}
                    className="form-input"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                  />
                </FormField>
                <FormField label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    maxLength={200}
                    className="form-input"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Project Type" error={errors.projectType}>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    className="form-input"
                    aria-invalid={!!errors.projectType}
                  >
                    <option value="">Select a type...</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Budget Range">
                  <select
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select a range...</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Message" error={errors.message}>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  maxLength={2000}
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell me about your project, goals, and what you need..."
                  aria-invalid={!!errors.message}
                />
              </FormField>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">{formData.message.length}/2000</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={(ev) => handleSubmit(ev, 'email')}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_25px_-5px_hsl(var(--accent)/0.5)] hover:scale-[1.02]"
                  >
                    <Mail className="h-4 w-4" />
                    Send via Email
                  </button>
                  <button
                    type="button"
                    onClick={(ev) => handleSubmit(ev, 'whatsapp')}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-600 dark:text-green-400 transition-all hover:bg-green-500/20 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send via WhatsApp
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.form-input:focus) {
          border-color: hsl(var(--accent));
          box-shadow: 0 0 0 3px hsl(var(--accent) / 0.12);
        }
        :global(.form-input::placeholder) {
          color: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </section>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-wide uppercase text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
