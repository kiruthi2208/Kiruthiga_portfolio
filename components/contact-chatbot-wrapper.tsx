'use client';

import { useState } from 'react';
import { Contact } from '@/components/contact';
import { Chatbot } from '@/components/chatbot';

export function ContactChatbotWrapper() {
  const [prefillTrigger, setPrefillTrigger] = useState(0);

  return (
    <>
      <Contact prefillTrigger={prefillTrigger} />
      <Chatbot onInquirySubmit={() => setPrefillTrigger((prev) => prev + 1)} />
    </>
  );
}
