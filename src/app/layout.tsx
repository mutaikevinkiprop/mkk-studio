import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../styles/globals.css'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { Preloader } from '@/components/layout/Preloader'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'mkk Studio - Digital Craft Studio',
    template: '%s - mkk Studio',
  },
  description:
    'mkk Studio is a creative development practice building brands, websites and interactive experiences with precision.',
  openGraph: {
    title: 'mkk Studio - Digital Craft Studio',
    description:
      'Brand systems, web experiences and interactive motion, engineered end-to-end.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='bg-ink-navy'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='bg-ink-navy text-neutral-100 antialiased'>
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
