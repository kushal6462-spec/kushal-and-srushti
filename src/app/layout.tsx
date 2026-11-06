import type { Metadata } from 'next';
import './globals.css';
import { LangProvider, LocalizationProvider } from '@/locales';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Kushal & Srushti',
  description:
    'A wedding invitation for Kushal and Srushti, with their photographs and the song Love.',
  openGraph: {
    title: 'Kushal & Srushti',
    description:
      'You are invited to the wedding of Kushal and Srushti.',
    images: ['/assets/images/gallery/01.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <LangProvider>
          <LocalizationProvider>
            {children}
            <Toaster />
          </LocalizationProvider>
        </LangProvider>
      </body>
    </html>
  );
}
