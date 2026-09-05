const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CONTACT_EMAIL = Deno.env.get("CONTACT_EMAIL") || "kiruthigas2208@gmail.com";
const RESEND_API_URL = "https://api.resend.com/emails";

function sanitize(str: string): string {
  return str.trim().replace(/[<>]/g, "");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, projectType, budget, message, source, conversation } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanProjectType = projectType ? sanitize(projectType) : "";
    const cleanBudget = budget ? sanitize(budget) : "Not specified";
    const cleanMessage = sanitize(message);

    const timestamp = new Date().toISOString();
    const isKiriAI = source === "kiri-ai";
    const subject = `New Portfolio Project Inquiry — ${cleanProjectType || "Project"}`;
    const headerLabel = isKiriAI ? "New Project Inquiry — Kiri AI" : "New Project Inquiry";
    const headerSub = isKiriAI
      ? "Kiruthiga S — Kiri AI Chatbot Lead"
      : "Kiruthiga S — Portfolio Contact Form";

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
            <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; font-size: 14px;">Project Type:</td><td style="padding: 8px 0; color: #475569; font-size: 14px;">${cleanProjectType || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #334155; font-size: 14px;">Budget:</td><td style="padding: 8px 0; color: #475569; font-size: 14px;">${cleanBudget}</td></tr>
          </table>
          <div style="margin-top: 16px;">
            <div style="font-weight: bold; color: #334155; padding: 8px 0; font-size: 14px;">${isKiriAI ? "Requirements:" : "Message:"}</div>
            <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</div>
          </div>
          ${conversation ? `
          <div style="margin-top: 16px;">
            <div style="font-weight: bold; color: #334155; padding: 8px 0; font-size: 14px;">Chat Conversation:</div>
            <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; color: #64748b; font-size: 12px; line-height: 1.6; white-space: pre-wrap;">${conversation}</div>
          </div>
          ` : ""}
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Submitted: ${timestamp}</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">${headerSub}</p>
          </div>
        </div>
      </div>
    `;

    const textBody = [
      headerLabel,
      "",
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Project Type: ${cleanProjectType || "Not specified"}`,
      `Budget: ${cleanBudget}`,
      "",
      `${isKiriAI ? "Requirements" : "Message"}:`,
      cleanMessage,
      conversation ? `\nChat Conversation:\n${conversation}\n` : "",
      `Submitted: ${timestamp}`,
      "",
      headerSub,
    ].join("\n").trim();

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email delivery is not configured." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: CONTACT_EMAIL,
        reply_to: cleanEmail,
        subject,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error("Resend API error:", resendResponse.status, errorData);
      return new Response(
        JSON.stringify({ error: "Failed to send email." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await resendResponse.json().catch(() => ({}));

    if (!data.id) {
      console.error("Resend API returned no email id:", data);
      return new Response(
        JSON.stringify({ error: "Failed to send email." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Contact edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
