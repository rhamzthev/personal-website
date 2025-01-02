import './globals.css'
import { Roboto_Serif } from 'next/font/google'

const robotoSerif = Roboto_Serif({ subsets: ['latin'] })

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
      <body className={`min-h-screen ${robotoSerif.className}`}>
        {children}
      </body>
    </html>
  )
}