'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  showInquiryCTA?: boolean;
  leadComplete?: boolean;
};

type LeadData = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  requirements?: string;
  business?: string;
};

const initialMessage: Message = {
  role: 'assistant',
  content:
    "Hi! I'm Kiri AI \uD83D\uDC4B\nI can help you explore Kiruthiga's skills, projects and services — or help you figure out what kind of website you need.",
};

const quickPrompts = [
  'What can she build?',
  'Show me her projects',
  'What are her skills?',
  'I need a website',
  'How can I contact her?',
];

export function Chatbot({ onInquirySubmit }: { onInquirySubmit?: () => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const leadActive = useRef(false);
  const leadData = useRef<LeadData>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          leadActive: leadActive.current,
          leadData: leadData.current,
        }),
      });
      const data = await res.json();

      if (data.leadActive) {
        leadActive.current = true;
        leadData.current = data.leadData || leadData.current;
      }
      if (data.leadComplete) {
        leadActive.current = false;
        leadData.current = data.leadData || leadData.current;
      }

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply,
        showInquiryCTA: data.showInquiryCTA,
        leadComplete: data.leadComplete,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm having trouble responding right now. You can contact Kiruthiga directly at kiruthigas2208@gmail.com or via WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([initialMessage]);
    leadActive.current = false;
    leadData.current = {};
  };

  const submitInquiry = () => {
    const inquiryData = {
      name: leadData.current.name || '',
      email: leadData.current.email || '',
      projectType: leadData.current.projectType || '',
      budget: leadData.current.budget || '',
      message: leadData.current.requirements || leadData.current.business || '',
    };
    sessionStorage.setItem('kiri-inquiry', JSON.stringify(inquiryData));

    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Kiri AI'}: ${m.content}`)
      .join('\n\n');
    sessionStorage.setItem('kiri-conversation', transcript);

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: "I've saved your project details. Let me take you to the contact form — your information is already filled in! You can review everything and send your inquiry directly.",
      },
    ]);

    leadActive.current = false;
    leadData.current = {};

    setTimeout(() => {
      setOpen(false);
      onInquirySubmit?.();
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow group"
        aria-label="Open Kiri AI assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && !unread && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-accent border-2 border-background" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-3 sm:right-6 z-[90] w-[calc(100vw-1.5rem)] sm:w-96 max-w-md"
          >
            <div className="flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden h-[min(600px,70vh)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/15">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-tight">Kiri AI</div>
                    <div className="text-[10px] text-muted-foreground">Kiruthiga's Portfolio Assistant</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Clear chat"
                    title="Clear chat"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-3">
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={i}
                    message={msg}
                    onInquiry={submitInquiry}
                  />
                ))}

                {loading && (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
                      <Sparkles className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-secondary/50 px-3 py-3">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }} />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: '200ms' }} />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: '400ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick prompts */}
              {messages.length <= 2 && !loading && !leadActive.current && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors"
                    >
                      {prompt}
                      <ChevronRight className="h-2.5 w-2.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="border-t border-border p-3">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    maxLength={500}
                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                    aria-label="Chat message"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({
  message,
  onInquiry,
}: {
  message: Message;
  onInquiry: () => void;
}) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 mt-0.5">
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? 'bg-accent text-accent-foreground rounded-br-md'
            : 'bg-secondary/60 rounded-bl-md'
        }`}
      >
        {message.content}
        {message.showInquiryCTA && (
          <button
            onClick={onInquiry}
            className="mt-3 w-full rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Review & Send Inquiry
          </button>
        )}
      </div>
    </motion.div>
  );
}
