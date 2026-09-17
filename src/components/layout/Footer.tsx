'use client'

import Link from 'next/link'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { Marquee } from '@/components/motion/Marquee'
import { navigation, site } from '@/content/site'

/**
 * Footer - oversized editorial closer with marquee, big CTA and studio meta.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='edge-fade relative overflow-hidden bg-ink-navy pt-24 md:pt-32'>
      <Marquee items={['Start a Project', 'mkk Studio', 'Let’s build', 'Digital Craft']} />

      <div className='container-grid mt-20 md:mt-28'>
        <div className='col-span-12 md:col-span-8'>
          <AnimatedText
            as='h2'
            lines={['Have a project', 'in mind?']}
            className='font-display text-5xl font-medium tracking-tight text-neutral-100 md:text-8xl'
          />
        </div>
        <div className='col-span-12 mt-10 flex items-end md:col-span-4 md:mt-0 md:justify-end'>
          <Link
            href='/contact'
            data-cursor='label'
            data-cursor-label='Start'
            className='group inline-flex items-center gap-4 font-display text-lg uppercase tracking-[0.15em] text-signal-cyan'
          >
            Start a Project
            <span className='inline-block h-px w-10 bg-signal-cyan transition-all duration-500 ease-mkk group-hover:w-16' />
          </Link>
        </div>
      </div>

      <div className='container-grid mt-24 border-t border-ink-700 py-10 md:mt-32'>
        <div className='col-span-6 md:col-span-3'>
          <p className='font-display text-xs uppercase tracking-[0.25em] text-neutral-500'>Studio</p>
          <p className='mt-4 text-sm text-neutral-300'>{site.location}</p>
        </div>
        <div className='col-span-6 md:col-span-3'>
          <p className='font-display text-xs uppercase tracking-[0.25em] text-neutral-500'>Contact</p>
          <a href={`mailto:${site.email}`} data-cursor className='mt-4 block text-sm text-neutral-300 hover:text-signal-cyan'>
            {site.email}
          </a>
          <a href={`tel:${site.phone}`} data-cursor className='mt-1 block text-sm text-neutral-300 hover:text-signal-cyan'>
            {site.phone}
          </a>
        </div>
        <div className='col-span-6 mt-8 md:col-span-3 md:mt-0'>
          <p className='font-display text-xs uppercase tracking-[0.25em] text-neutral-500'>Menu</p>
          <nav className='mt-4 flex flex-col gap-2'>
            {navigation.map((n) => (
              <Link key={n.href} href={n.href} data-cursor className='text-sm text-neutral-300 hover:text-signal-cyan'>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className='col-span-6 mt-8 md:col-span-3 md:mt-0'>
          <p className='font-display text-xs uppercase tracking-[0.25em] text-neutral-500'>Social</p>
          <nav className='mt-4 flex flex-col gap-2'>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} data-cursor className='text-sm text-neutral-300 hover:text-signal-cyan'>
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className='container-grid border-t border-ink-700 py-8'>
        <p className='col-span-12 font-display text-xs uppercase tracking-[0.2em] text-neutral-500'>
          © {year} {site.name} - All rights reserved
        </p>
      </div>
    </footer>
  )
}
