import { NextResponse } from 'next/server';

const PORTFOLIO_KNOWLEDGE = `
Kiruthiga S is a Full-Stack Web Developer based in Namakkal, Tamil Nadu, India.
She is an MCA graduate from Vellalar College for Women, Erode.
She also holds a BSc in Computer Science from the same institution.

Her focus areas: Full-Stack Web Development and AI-Assisted Development.

Technologies she knows:
- Programming: Python, C, C++, Java, PHP, Visual Basic 6.0, ASP.NET
- Web & Database: HTML, CSS, JavaScript, PHP, MySQL, SQL
- AI: Prompt Engineering, Generative AI, AI-Assisted Development, Prompt Optimization, AI Output Evaluation
- AI Tools: ChatGPT, Gemini, Claude, Qwen, DeepSeek
- Tools: Visual Studio Code, XAMPP, Git, InfinityFree, Vercel

Projects she has built:
1. Mothers Milk Bank Management System — Confidential real-world project for Erode Government Hospital. Manages donor registration, milk collection, storage and distribution. No public demo available due to confidentiality.
2. InternSync — Intern Management System built during internship at AIM Universse. Features: intern registration, attendance tracking, performance evaluation. Tech: HTML, CSS, JavaScript, PHP, MySQL.
3. Finance Management System — Web app for tracking income/expenses and generating reports. Tech: HTML, CSS, JavaScript, PHP, MySQL. Hosted on InfinityFree.
4. Faculty Resource Portal — Role-based portal for faculty to upload materials and students to download. Tech: HTML, CSS, JavaScript, PHP, MySQL.
5. Books & Bytes — E-commerce platform for purchasing books and downloading e-books. Has user authentication and admin panel. Tech: HTML, CSS, JavaScript, PHP, MySQL.
6. Hospital Management System — Desktop application built during internship at Browzone Infotech using Visual Basic 6.0. Features: patient registration, appointment scheduling, records management.

Experience:
- Web Developer Intern at AIM Universse, Coimbatore (Dec 2025 – Mar 2026): Built InternSync.
- Software Developer Intern at Browzone Infotech, Erode (Dec 2023 – Jan 2024): Built Hospital Management System in VB6.

Certifications:
- Deep Learning (NPTEL)
- Full Stack Development (OdugaaTech)
- AI for Business Professionals (HP LIFE)
- AI for Beginners (HP LIFE)

Services she offers: Business Websites, Landing Pages, Custom Web Applications, Management Systems, E-Commerce Websites, Website Redesign, AI-Assisted Development.

Contact info:
- Email: kiruthigas2208@gmail.com
- Phone: 9360013623
- LinkedIn: https://www.linkedin.com/in/kiruthiga-s-553138314/
- WhatsApp: +91 9360013623
- Location: Namakkal, Tamil Nadu, India

She is available for freelance projects.
`;

// ---- Fallback conversational system ----

const FALLBACK_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['who', 'about', 'tell me about', 'kiruthiga'],
    reply: `Kiruthiga S is a Full-Stack Web Developer based in Namakkal, Tamil Nadu, India. She's an MCA graduate with hands-on experience in PHP, MySQL, JavaScript and AI-assisted development. She builds practical, responsive web applications designed to solve real-world problems.`,
  },
  {
    keywords: ['skill', 'technologies', 'tech stack', 'what does she know', 'languages'],
    reply: `Kiruthiga's technical skills include:

Programming: Python, C, C++, Java, PHP, Visual Basic 6.0, ASP.NET
Web & Database: HTML, CSS, JavaScript, PHP, MySQL, SQL
AI: Prompt Engineering, Generative AI, AI-Assisted Development, Prompt Optimization, AI Output Evaluation
AI Tools: ChatGPT, Gemini, Claude, Qwen, DeepSeek
Tools: VS Code, XAMPP, Git, InfinityFree, Vercel`,
  },
  {
    keywords: ['project', 'work', 'portfolio', 'built', 'case study', 'show me'],
    reply: `Here are Kiruthiga's key projects:

1. Mothers Milk Bank Management System — Confidential real-world project for Erode Government Hospital
2. InternSync — Intern Management System (AIM Universse internship)
3. Finance Management System — Income/expense tracking web app
4. Faculty Resource Portal — Role-based material sharing portal
5. Books & Bytes — E-commerce platform for books
6. Hospital Management System — Desktop app (Browzone Infotech internship)

You can click on any project on the page to see full details!`,
  },
  {
    keywords: ['php', 'mysql', 'laravel'],
    reply: `Yes! Kiruthiga specializes in PHP and MySQL development. She has built multiple web applications using this stack including InternSync, Finance Management System, Faculty Resource Portal, and Books & Bytes. She can build PHP-based websites, web applications, and management systems.`,
  },
  {
    keywords: ['ecommerce', 'e-commerce', 'shopping', 'online store'],
    reply: `Yes! Kiruthiga built Books & Bytes, an e-commerce platform with user authentication and an admin panel for purchasing books and downloading e-books. She can build e-commerce websites with similar functionality.`,
  },
  {
    keywords: ['management system', 'admin', 'dashboard', 'crm'],
    reply: `Absolutely. Kiruthiga has built several management systems including the Mothers Milk Bank Management System (for Erode Government Hospital) and InternSync (intern management). She can build custom management systems for users, records, and workflows.`,
  },
  {
    keywords: ['ai', 'prompt', 'generative', 'chatgpt', 'gemini', 'claude'],
    reply: `Kiruthiga has practical experience with Generative AI and Prompt Engineering. She uses AI tools (ChatGPT, Gemini, Claude, Qwen, DeepSeek) for code generation, debugging, problem-solving, content creation, and workflow improvement. Her AI skills include Prompt Engineering, Prompt Optimization, and AI Output Evaluation.`,
  },
  {
    keywords: ['available', 'freelance', 'hire', 'work with', 'free'],
    reply: `Yes, Kiruthiga is available for freelance projects! She can build business websites, landing pages, custom web applications, management systems, e-commerce sites, and more. Use the contact form on this page or reach out via WhatsApp or email to start a project.`,
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'linkedin', 'how can i'],
    reply: `You can contact Kiruthiga through:

Email: kiruthigas2208@gmail.com
Phone: 9360013623
WhatsApp: +91 9360013623
LinkedIn: linkedin.com/in/kiruthiga-s-553138314

Or simply scroll down to the contact form on this page to send a project inquiry!`,
  },
  {
    keywords: ['service', 'build', 'offer', 'what can she', 'do you do'],
    reply: `Kiruthiga offers these services:

1. Business Websites — Modern, responsive sites
2. Landing Pages — Focused on a clear goal
3. Custom Web Applications — Built around specific requirements
4. Management Systems — For users, records, workflows
5. E-Commerce Websites — With authentication and admin panel
6. Website Redesign — Modernizing outdated sites
7. AI-Assisted Development — AI-powered development workflows

What kind of project are you looking for?`,
  },
  {
    keywords: ['education', 'degree', 'college', 'study', 'mca', 'qualification'],
    reply: `Kiruthiga holds:
- Master of Computer Applications (MCA) from Vellalar College for Women, Erode
- Bachelor of Science in Computer Science from Vellalar College for Women, Erode

She also has certifications in Deep Learning (NPTEL), Full Stack Development (OdugaaTech), and AI courses from HP LIFE.`,
  },
  {
    keywords: ['experience', 'internship', 'worked', 'company'],
    reply: `Kiruthiga has two internship experiences:

1. Web Developer Intern at AIM Universse, Coimbatore (Dec 2025 – Mar 2026) — Built InternSync, a complete intern management system.

2. Software Developer Intern at Browzone Infotech, Erode (Dec 2023 – Jan 2024) — Built a Hospital Management System in Visual Basic 6.0.`,
  },
  {
    keywords: ['certification', 'certificate', 'course'],
    reply: `Kiruthiga's certifications:
- Deep Learning — NPTEL
- Full Stack Development — OdugaaTech
- AI for Business Professionals — HP LIFE
- AI for Beginners — HP LIFE`,
  },
  {
    keywords: ['location', 'where', 'based', 'city', 'from'],
    reply: `Kiruthiga is based in Namakkal, Tamil Nadu, India. She works remotely and is available for freelance projects globally.`,
  },
  {
    keywords: ['price', 'cost', 'rate', 'charge', 'budget', 'how much'],
    reply: `Project pricing depends on the scope and complexity. You can share your project details and budget range through the contact form on this page, and Kiruthiga will get back to you with a tailored quote. Budget options range from under ₹5,000 to ₹25,000+.`,
  },
];

function findFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  let bestMatch: { keywords: string[]; reply: string } | null = null;
  let bestScore = 0;

  for (const entry of FALLBACK_RESPONSES) {
    const score = entry.keywords.reduce((acc, kw) => {
      return acc + (lower.includes(kw) ? kw.length : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch) return bestMatch.reply;

  return `I don't have that information yet. You can contact Kiruthiga directly at kiruthigas2208@gmail.com or via WhatsApp at +91 9360013623 for more details.`;
}

// ---- Lead qualification flow ----

type LeadData = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  requirements?: string;
  business?: string;
};

const PROJECT_TYPE_KEYWORDS: { type: string; keywords: string[] }[] = [
  { type: 'Business Website', keywords: ['business website', 'company website', 'professional website', 'business site'] },
  { type: 'Landing Page', keywords: ['landing page', 'landing', 'single page'] },
  { type: 'Web Application', keywords: ['web application', 'web app', 'web-based', 'online tool', 'platform', 'portal'] },
  { type: 'E-Commerce', keywords: ['ecommerce', 'e-commerce', 'online store', 'shop', 'shopping', 'sell products', 'sell online'] },
  { type: 'Management System', keywords: ['management system', 'admin panel', 'dashboard', 'crm', 'record management', 'tracking system', 'booking system'] },
  { type: 'Website Redesign', keywords: ['redesign', 'rebuild', 'update website', 'modernize', 'upgrade website', 'revamp'] },
  { type: 'Other', keywords: ['php project', 'custom project', 'other'] },
];

const BUDGET_KEYWORDS: { budget: string; keywords: string[] }[] = [
  { budget: 'Under ₹5,000', keywords: ['under 5000', 'below 5000', 'less than 5000', 'cheap', 'budget-friendly'] },
  { budget: '₹5,000 – ₹10,000', keywords: ['5000 to 10000', '5000-10000', '5k to 10k', '5000 - 10000'] },
  { budget: '₹10,000 – ₹25,000', keywords: ['10000 to 25000', '10000-25000', '10k to 25k', '10000 - 25000'] },
  { budget: '₹25,000+', keywords: ['25000+', '25k+', 'above 25000', 'more than 25000', 'premium'] },
  { budget: 'Not sure yet', keywords: ['not sure', 'unsure', "don't know", 'no idea', 'flexible'] },
];

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

// Lead qualification steps in order
const LEAD_STEPS = ['name', 'projectType', 'requirements', 'budget', 'email'] as const;
type LeadStep = typeof LEAD_STEPS[number];

const STEP_PROMPTS: Record<LeadStep, string> = {
  name: "Great! Let me help you get started. What's your name?",
  projectType: "Nice to meet you, {name}! What kind of project do you need? For example: Business Website, Landing Page, Web Application, E-Commerce, Management System, or a Website Redesign?",
  requirements: "What's the project about? Tell me a bit about your business or what you'd like the website/application to do.",
  budget: "What budget range are you considering? Options are: Under ₹5,000, ₹5,000–₹10,000, ₹10,000–₹25,000, ₹25,000+, or Not sure yet.",
  email: "What's the best email to reach you at? Kiruthiga will use this to get back to you.",
};

function detectProjectType(message: string): string | null {
  const lower = message.toLowerCase();
  for (const { type, keywords } of PROJECT_TYPE_KEYWORDS) {
    if (keywords.some((kw) => lower.includes(kw))) return type;
  }
  return null;
}

function detectBudget(message: string): string | null {
  const lower = message.toLowerCase();
  for (const { budget, keywords } of BUDGET_KEYWORDS) {
    if (keywords.some((kw) => lower.includes(kw))) return budget;
  }
  // Also check for raw numbers
  if (lower.match(/₹?\s*25,?000/)) return '₹25,000+';
  if (lower.match(/₹?\s*1[05],?000/)) return '₹10,000 – ₹25,000';
  if (lower.match(/₹?\s*[5-9],?000/)) return '₹5,000 – ₹10,000';
  if (lower.match(/₹?\s*[1-4],?000/)) return 'Under ₹5,000';
  return null;
}

function detectEmail(message: string): string | null {
  const match = message.match(EMAIL_REGEX);
  return match ? match[0] : null;
}

function getNextMissingStep(data: LeadData): LeadStep | null {
  for (const step of LEAD_STEPS) {
    if (!data[step]) return step;
  }
  return null;
}

function formatPrompt(step: LeadStep, data: LeadData): string {
  let prompt = STEP_PROMPTS[step];
  if (step === 'projectType' && data.name) {
    prompt = prompt.replace('{name}', data.name);
  }
  return prompt;
}

function formatSummary(data: LeadData): string {
  return `Here's a summary of your project inquiry:

Name: ${data.name || 'Not provided'}
Project Type: ${data.projectType || 'Not specified'}
Requirements: ${data.requirements || 'Not specified'}
Budget: ${data.budget || 'Not specified'}
Email: ${data.email || 'Not provided'}

Would you like to send this as a project inquiry to Kiruthiga? Click the button below to submit it!`;
}

// ---- Project intent detection ----

const PROJECT_INTENT_TRIGGERS = [
  'i need a website', 'need a website', 'build a website', 'create a website', 'want a website',
  'i need a web application', 'need a web application', 'need a web app', 'build a web app',
  'i need an app', 'build a web application',
  'start a project', 'build me', 'hire you', 'work with you',
  "i'm looking for", 'looking to build', 'looking for a developer',
  'can you build', 'can she build', 'can kiruthiga build',
  'i want an ecommerce', 'i need an online store', 'online store',
  'i need a management system', 'i want a management system',
  'i want to redesign', 'redesign my website', 'update my website',
  'i need a php project', 'php project',
  'i need a landing page', 'i want a landing page',
  'i need someone to build',
];

function hasProjectIntent(message: string): boolean {
  const lower = message.toLowerCase();
  return PROJECT_INTENT_TRIGGERS.some((trigger) => lower.includes(trigger));
}

// ---- Greeting detection ----

const GREETING_KEYWORDS = ['hi', 'hello', 'hey', 'hii', 'hola', 'greetings', 'good morning', 'good afternoon', 'good evening'];

function isGreeting(message: string): boolean {
  const lower = message.toLowerCase().trim();
  if (lower.length > 30) return false;
  return GREETING_KEYWORDS.some((g) => lower === g || lower.startsWith(g + ' ') || lower.startsWith(g + '!'));
}

// ---- Main handler ----

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, leadData, leadActive } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    // Handle active lead qualification flow
    if (leadActive) {
      const data: LeadData = leadData || {};
      const lowerMessage = message.toLowerCase();

      // Try to extract info from the current message for any missing field
      const detectedType = detectProjectType(message);
      const detectedBudget = detectBudget(message);
      const detectedEmail = detectEmail(message);

      if (detectedType && !data.projectType) data.projectType = detectedType;
      if (detectedBudget && !data.budget) data.budget = detectedBudget;
      if (detectedEmail && !data.email) data.email = detectedEmail;

      // Determine which step we're currently on (first missing field)
      const currentStep = getNextMissingStep(data);

      if (currentStep === null) {
        // All fields collected — show summary
        return NextResponse.json({
          reply: formatSummary(data),
          showInquiryCTA: true,
          leadComplete: true,
          leadData: data,
        });
      }

      // Process the current message based on which step we're filling
      if (currentStep === 'name' && !data.name) {
        // The user's message IS their name (or contains it)
        const cleanName = message.trim().replace(/^(my name is|i am|i'm|it's|this is)\s+/i, '').replace(/^./, (c) => c.toUpperCase());
        if (cleanName.length > 1 && cleanName.length < 100) {
          data.name = cleanName;
        }
      } else if (currentStep === 'projectType') {
        // Already tried detectProjectType above. If not detected, use the message as-is if short
        if (!data.projectType && message.trim().length < 100) {
          data.projectType = message.trim();
        }
      } else if (currentStep === 'requirements') {
        data.requirements = message.trim();
      } else if (currentStep === 'budget') {
        // Already tried detectBudget above
        if (!data.budget) {
          if (lowerMessage.includes('not sure') || lowerMessage.includes("don't know") || lowerMessage.includes('unsure') || lowerMessage.includes('flexible')) {
            data.budget = 'Not sure yet';
          } else if (message.trim().length < 100) {
            data.budget = message.trim();
          }
        }
      } else if (currentStep === 'email') {
        // Already tried detectEmail above
        if (!data.email) {
          // If the message looks like it might contain an email but regex missed it
          if (message.trim().length < 100 && message.includes('@')) {
            data.email = message.trim();
          }
        }
      }

      // Check if we now have all data
      const nextStep = getNextMissingStep(data);
      if (nextStep === null) {
        return NextResponse.json({
          reply: formatSummary(data),
          showInquiryCTA: true,
          leadComplete: true,
          leadData: data,
        });
      }

      // Acknowledge what was said and ask the next question
      let reply = formatPrompt(nextStep, data);

      // Add a small acknowledgment for certain steps
      if (currentStep === 'name' && data.name && nextStep === 'projectType') {
        reply = `Nice to meet you, ${data.name}! What kind of project do you need? For example: Business Website, Landing Page, Web Application, E-Commerce, Management System, or a Website Redesign?`;
      } else if (currentStep === 'requirements' && data.requirements && nextStep === 'budget') {
        reply = `That sounds like a great project! What budget range are you considering? Options are: Under ₹5,000, ₹5,000–₹10,000, ₹10,000–₹25,000, ₹25,000+, or Not sure yet.`;
      } else if (currentStep === 'projectType' && data.projectType && nextStep === 'requirements') {
        reply = `Great, a ${data.projectType} — what's the project about? Tell me a bit about your business or what you'd like it to do.`;
      }

      return NextResponse.json({
        reply,
        leadActive: true,
        leadData: data,
      });
    }

    // Check for greeting first (only if no project intent)
    if (isGreeting(message) && !hasProjectIntent(message)) {
      return NextResponse.json({
        reply: "Hi! 👋 I'm Kiri AI, Kiruthiga's portfolio assistant. I'm here to help you learn about her work and services. Are you looking for a website, web application, e-commerce platform, or something else?",
      });
    }

    // Check for project intent — start lead qualification
    if (hasProjectIntent(message)) {
      // Try to detect project type from the initial message
      const detectedType = detectProjectType(message);
      const data: LeadData = {};
      if (detectedType) data.projectType = detectedType;

      const firstStep = getNextMissingStep(data)!;
      return NextResponse.json({
        reply: formatPrompt(firstStep, data),
        leadActive: true,
        leadData: data,
      });
    }

    // ---- AI API (if configured) ----
    const AI_API_KEY = process.env.AI_API_KEY;

    if (AI_API_KEY) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are Kiri AI, Kiruthiga S's portfolio assistant. You help visitors learn about Kiruthiga's skills, projects, and services. You are NOT Kiruthiga yourself — you are her assistant.

IMPORTANT RULES:
- Only use the verified information provided below. Never hallucinate or make up information.
- If you don't know something, say: "I don't have that information yet. You can contact Kiruthiga directly for more details."
- Never pretend to be Kiruthiga. Always identify as "Kiruthiga's portfolio assistant" when relevant.
- Never invent project URLs, GitHub links, testimonials, or credentials.
- Keep responses concise and friendly (2-4 sentences typically).
- For the Mothers Milk Bank project, always mention it's confidential — no public demo available.
- If someone shows project intent (wants a website, app, etc.), encourage them to use the contact form on the page.

VERIFIED PORTFOLIO INFORMATION:
${PORTFOLIO_KNOWLEDGE}`,
              },
              ...((body.history || []).map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              }))),
              { role: 'user', content: message },
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
        });

        if (!res.ok) throw new Error('AI API failed');
        const aiData = await res.json();
        const reply = aiData.choices?.[0]?.message?.content;

        if (reply) {
          return NextResponse.json({ reply });
        }
        throw new Error('No reply from AI');
      } catch (err) {
        console.error('AI API error, falling back:', err);
      }
    }

    // Fallback to deterministic FAQ system
    const reply = findFallbackResponse(message);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
