import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Suspense } from 'react';
import Loading from './loading';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Providers } from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'MSPS Project',
  description: 'MSPS Project: PD, Vascular',
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ka' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params
  const { locale } = await params;

  // Validate locale early
  if (!['en', 'ka'].includes(locale)) {
    notFound();
  }

  // Load messages
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="container mx-auto max-w-4xl px-4 pt-2">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Suspense fallback={<Loading />}>
              <Providers>{children}</Providers>
            </Suspense>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
