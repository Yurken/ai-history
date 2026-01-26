import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { routing } from '@/lib/i18n/routing';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AI History - 人工智能全史',
  description: '从图灵测试到GPT：探索人工智能的完整发展历程',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
