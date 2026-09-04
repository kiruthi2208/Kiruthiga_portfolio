import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const contactEmail = process.env.CONTACT_EMAIL || 'kiruthigas2208@gmail.com';

const rateLimitStore = new Map<string, number[]>();

const MAX_LENGTHS = {
  name: 100,
  email: 200,
  projectType: 50,
  budget: 50,
  message: 2000,
};

const VALID_PROJECT_TYPES = [
  'Business Website',
  'Landing Page',
  'Web Application',
  'E-Commerce',
  'Management System',
  'Website Redesign',
  'Other',
];

const VALID_BUDGETS = [
  'Under ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000+',
  'Not sure yet',
];

function sanitize(str: string): string {
  return str.trim().replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  try {
    // Basic rate limiting via IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const RATE_LIMIT_WINDOW = 60_000; // 1 minute
    const RATE_LIMIT_MAX = 3;

    if (!rateLimitStore.has(ip)) {
      rateLimitStore.set(ip, []);
    }
    const timestamps = rateLimitStore.get(ip)!;
    const now = Date.now();
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (recent.length >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      );
    }
    recent.push(now);
    rateLimitStore.set(ip, recent);

    const body = await request.json();
    const { name, email, projectType, budget, message, source, conversation } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // projectType is optional when source is kiri-ai (may not always map cleanly)
    if (projectType && !VALID_PROJECT_TYPES.includes(projectType)) {
      return NextResponse.json({ error: 'Valid project type is required' }, { status: 400 });
    }

    // Validate budget if provided
    if (budget && !VALID_BUDGETS.includes(budget)) {
      return NextResponse.json({ error: 'Invalid budget selection' }, { status: 400 });
    }

    // Validate lengths
    if (name.length > MAX_LENGTHS.name) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
    }
    if (email.length > MAX_LENGTHS.email) {
      return NextResponse.json({ error: 'Email is too long' }, { status: 400 });
    }
    if (message.length > MAX_LENGTHS.message) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
    }

    // Sanitize
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanProjectType = sanitize(projectType);
    const cleanBudget = budget ? sanitize(budget) : 'Not specified';
    const cleanMessage = sanitize(message);

    const timestamp = new Date().toISOString();
    const isKiriAI = source === 'kiri-ai';
    const subject = isKiriAI
      ? `NEW PROJECT INQUIRY — KIRI AI — ${cleanProjectType || 'Project'}`
      : `New Portfolio Project Inquiry — ${cleanProjectType || 'Project'}`;
    const headerLabel = isKiriAI ? 'New Project Inquiry — Kiri AI' : 'New Project Inquiry';
    const headerSub = isKiriAI
      ? 'Kiruthiga S — Kiri AI Chatbot Lead'
      : 'Kiruthiga S — Portfolio Contact Form';

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0284c7, #0ea5e9); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">${headerLabel}</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">${headerSub}</p>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; width: 120px; font-size: 14px;">Name:</td><td style="padding: 8px 0; color: #475569; font-size: 14px;">${cleanName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; font-size: 14px;">Email:</td><td style="padding: 8px 0; color: #475569; font-size: 14px;"><a href="mailto:${cleanEmail}" style="color: #0284c7;">${cleanEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; font-size: 14px;">Project Type:</td><td style="padding: 8px 0; color: #475569; font-size: 14px;">${cleanProjectType || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; font-size: 14px;">Budget:</td><td style="padding: 8px 0; color: #475569; font-size: 14px;">${cleanBudget}</td></tr>
          </table>
          <div style="margin-top: 16px;">
            <div style="font-weight: bold; color: #334155; padding: 8px 0; font-size: 14px;">${isKiriAI ? 'Requirements:' : 'Message:'}</div>
            <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</div>
          </div>
          ${conversation ? `
          <div style="margin-top: 16px;">
            <div style="font-weight: bold; color: #334155; padding: 8px 0; font-size: 14px;">Chat Conversation:</div>
            <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; color: #64748b; font-size: 12px; line-height: 1.6; white-space: pre-wrap;">${conversation}</div>
          </div>
          ` : ''}
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Submitted: ${timestamp}</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">${headerSub}</p>
          </div>
        </div>
      </div>
    `;

    const textBody = `
${headerLabel}

Name: ${cleanName}
Email: ${cleanEmail}
Project Type: ${cleanProjectType || 'Not specified'}
Budget: ${cleanBudget}

${isKiriAI ? 'Requirements' : 'Message'}:
${cleanMessage}
${conversation ? `\nChat Conversation:\n${conversation}\n` : ''}
Submitted: ${timestamp}

${headerSub}
    `.trim();

    if (resend) {
      const { error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: contactEmail,
        replyTo: cleanEmail,
        subject,
        html: htmlBody,
        text: textBody,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: 'Failed to send email. Please try again later.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Email delivery is not yet configured. Please contact kiruthigas2208@gmail.com directly.' },
        { status: 503 }
      );
    }
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
