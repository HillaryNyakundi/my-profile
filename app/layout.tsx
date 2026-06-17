import type { Metadata } from 'next';
import { Inter, Lora, Anton } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' });

export const metadata: Metadata = {
  title: 'Hillary Nyakundi | Software Engineer',
  description:
    'Hillary Nyakundi — software engineer building web and mobile products, based in Nairobi, Kenya.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${lora.variable} ${anton.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mx-auto w-full max-w-7xl px-5 sm:px-6">{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
