import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import { Suspense } from 'react';
import Loading from './loading';
import { Toaster } from 'react-hot-toast';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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

export default async function RootLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: string;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="container mx-auto max-w-4xl px-4 pt-2">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
