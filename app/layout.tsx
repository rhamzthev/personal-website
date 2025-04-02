import './globals.css';
import { Roboto, Roboto_Serif } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Font configuration
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap'
});

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-roboto-serif',
  display: 'swap'
});

export const metadata = {
  title: 'Rhamsez Thevenin | Software Developer',
  description: 'Portfolio and professional profile of Rhamsez Thevenin, Software Developer & Solution Architect',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoSerif.variable}`}>
      <body className="font-sans bg-gray-950 text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}