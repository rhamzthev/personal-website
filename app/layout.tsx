import './globals.css'
import { Roboto_Serif, Roboto_Flex } from 'next/font/google'

const robotoSerif = Roboto_Serif({ subsets: ['latin'] });
const robotoSans = Roboto_Flex({ subsets: ['latin'] });

export const metadata = {
  title: 'Rhamsez Thevenin',
  description: 'Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${robotoSans.className} ${robotoSerif.className} bg-black`}>
        {children}
      </body>
    </html>
  )
}