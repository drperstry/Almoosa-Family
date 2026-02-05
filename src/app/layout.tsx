import type { Metadata } from 'next';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Al-Moosa Family Portal | عائلة الموسى',
  description: 'Official portal for the Al-Moosa family - services, news, events and more | البوابة الرسمية لعائلة الموسى',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <SessionProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
