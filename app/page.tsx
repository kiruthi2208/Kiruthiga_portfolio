import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Services } from '@/components/services';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { AISection } from '@/components/ai-section';
import { Experience } from '@/components/experience';
import { Process } from '@/components/process';
import { Footer } from '@/components/footer';
import { ContactChatbotWrapper } from '@/components/contact-chatbot-wrapper';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <AISection />
      <Experience />
      <Process />
      <ContactChatbotWrapper />
      <Footer />
    </main>
  );
}
