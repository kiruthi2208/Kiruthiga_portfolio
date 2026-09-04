import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { CustomCursor } from '@/components/custom-cursor';
import { ScrollProgress } from '@/components/scroll-progress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kiruthiga-portfolio.example.com'),
  title: 'Kiruthiga S | Full-Stack Web Developer & AI-Assisted Developer',
  description:
    'Portfolio of Kiruthiga S, a Full-Stack Web Developer specializing in PHP, MySQL, JavaScript, responsive web applications and AI-assisted development.',
  keywords: [
    'Kiruthiga S',
    'Full-Stack Web Developer',
    'AI-Assisted Development',
    'PHP Developer',
    'Prompt Engineering',
    'Freelance Web Developer India',
    'MCA Developer',
    'Web Application Development',
  ],
  authors: [{ name: 'Kiruthiga S' }],
  creator: 'Kiruthiga S',
  openGraph: {
    title: 'Kiruthiga S | Full-Stack Web Developer & AI-Assisted Developer',
    description:
      'Portfolio of Kiruthiga S, a Full-Stack Web Developer specializing in PHP, MySQL, JavaScript, responsive web applications and AI-assisted development.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiruthiga S | Full-Stack Web Developer',
    description:
      'Full-Stack Web Developer specializing in PHP, MySQL, JavaScript and AI-assisted development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
