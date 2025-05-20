import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import SideMenu from '@/components/SideMenu';
import style from '@/styles/layouts/dataLayout.module.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Data Lists',
  description: 'data bring of database',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container">
          <div className={style.containerLayout}>
            <SideMenu />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
