import type { Metadata } from 'next';
import { Cormorant_Garamond, Great_Vibes, Poppins } from 'next/font/google';
import './globals.css';
import { LangProvider, LocalizationProvider } from '@/locales';
import { Toaster } from 'sonner';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const script = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: '400',
});

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
      <body
        className={`${poppins.variable} ${cormorant.variable} ${script.variable} antialiased`}
      >
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
