import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-contact-email`;

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

    if (projectType && !VALID_PROJECT_TYPES.includes(projectType)) {
      return NextResponse.json({ error: 'Valid project type is required' }, { status: 400 });
    }

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

    // Forward to Supabase Edge Function which has access to RESEND_API_KEY via Bolt Secrets
    const edgeResponse = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        projectType: projectType || undefined,
        budget: budget || undefined,
        message: message.trim(),
        source: source || 'contact-form',
        conversation: conversation || undefined,
      }),
    });

    const data = await edgeResponse.json().catch(() => ({}));

    if (!edgeResponse.ok || data.error) {
      console.error('Edge function error:', edgeResponse.status, data);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
