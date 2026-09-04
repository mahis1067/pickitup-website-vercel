import '@/css/globals.css'

import type {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Pick It Up | Next.js example',
  description: 'A small example showing how Next.js, TSX markup, and CSS connect.',
}

export default async function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
