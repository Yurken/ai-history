import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { GSAPProvider } from '@/components/providers/GSAPProvider';
import { SideNav } from '@/components/navigation/SideNav';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <GSAPProvider>
            <div className="min-h-screen bg-white dark:bg-dark-950">
              {/* 侧边导航 */}
              <SideNav locale={locale} />

              {/* 主内容区域 - 添加左边距以适应侧边导航 */}
              <main className="lg:ml-60">
                {children}
              </main>
            </div>
          </GSAPProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
