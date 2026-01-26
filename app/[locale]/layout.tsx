import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { GSAPProvider } from '@/components/providers/GSAPProvider';
import { SideNav } from '@/components/navigation/SideNav';
import '../globals.css';

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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
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
  );
}
