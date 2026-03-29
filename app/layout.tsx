import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { GlideWrapper } from '@/components/GlideWrapper';
import { ClientOnlyBackground } from '@/components/ClientOnlyBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'NOVAVOX | Sonic Architecture',
  description: 'International Modernist Sonic Architecture - High contrast, monochrome, sharp edges, cinematic, architectural.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="bg-black text-white min-h-screen selection:bg-white selection:text-black overflow-x-hidden" suppressHydrationWarning>
        <CartProvider>
          <ClientOnlyBackground />
          <Sidebar />
          <div className="md:pl-64 flex flex-col min-h-screen perspective-container">
            <TopNav />
            <main className="flex-1 pt-24 pb-32 px-8 max-w-7xl mx-auto w-full">
              <GlideWrapper>
                {children}
                <Footer />
              </GlideWrapper>
            </main>
            <Player />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
