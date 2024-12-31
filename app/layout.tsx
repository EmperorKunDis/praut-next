import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Praut - AI Automatizace pro Vaši Firmu',
  description: 'Transformujte svoji firmu díky AI Automatizaci a obohaťte ji tak, aby byla konkurence schopna i v moderním světě.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}