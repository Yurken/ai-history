import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { GSAPProvider } from '@/components/providers/GSAPProvider';
import { SideNav } from '@/components/navigation/SideNav';
import { ReadingProgress } from '@/components/navigation/ReadingProgress';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeScript } from '@/components/providers/ThemeScript';
import '../globals.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI History - 人工智能全史',
  description: '从图灵测试到GPT：探索人工智能的完整发展历程',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <GSAPProvider>
              <div className="min-h-screen bg-white dark:bg-dark-950">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary-700 focus:px-5 focus:py-3 focus:text-white">
                  {locale === 'zh' ? '跳至正文' : 'Skip to content'}
                </a>
                <SideNav locale={locale} />
                <ReadingProgress locale={locale} />
                <main id="main-content" tabIndex={-1} className="lg:ml-60">
                  {children}
                </main>
              </div>
            </GSAPProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
