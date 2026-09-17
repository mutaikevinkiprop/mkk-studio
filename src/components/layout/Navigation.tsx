'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Magnetic } from '@/components/motion/Magnetic'
import { navigation, site } from '@/content/site'
import { cn } from '@/lib/utils'

/**
 * Navigation - fixed header with brand mark, desktop links, and a
 * fullscreen overlay menu (staggered items + curtain) for all viewports.
 */
export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll while the overlay is open
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[9000] border-b border-transparent bg-ink-navy transition-colors duration-500',
          scrolled ? 'border-ink-700' : ''
        )}
      >
        <div className='container-grid items-center py-6 md:py-8'>
          <Link
            href='/'
            className='col-span-6 flex items-center gap-3 md:col-span-6'
            data-cursor
            aria-label='mkk Studio home'
          >
            <span className='font-display text-lg font-semibold tracking-tight text-neutral-100'>
              mkk<span className='text-signal-cyan'>.</span>studio
            </span>
          </Link>

          <nav className='col-span-6 hidden items-center justify-end gap-10 md:col-span-6 md:flex'>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor
                className='group relative font-display text-sm uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-neutral-100'
              >
                {item.label}
                <span className='absolute -bottom-1 left-0 h-px w-0 bg-signal-cyan transition-all duration-500 ease-mkk group-hover:w-full' />
              </Link>
            ))}
            <Magnetic strength={0.35}>
              <Link
                href='/contact'
                data-cursor='label'
                data-cursor-label='Start'
                className='rounded-md border border-signal-cyan bg-signal-cyan/0 px-5 py-2.5 font-display text-sm font-medium uppercase tracking-[0.1em] text-signal-cyan transition-colors duration-300 hover:bg-signal-cyan hover:text-ink-navy'
              >
                Start a Project
              </Link>
            </Magnetic>
          </nav>

          {/* Menu toggle (mobile + always available for overlay) */}
          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor='label'
            data-cursor-label={open ? 'Close' : 'Menu'}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className='col-span-6 flex items-center justify-end gap-3 md:hidden'
          >
            <span className='font-display text-xs uppercase tracking-[0.2em] text-neutral-300'>
              {open ? 'Close' : 'Menu'}
            </span>
            <span className='relative flex h-6 w-8 flex-col justify-center gap-1.5'>
              <span
                className={cn(
                  'h-px w-full bg-neutral-100 transition-transform duration-500 ease-mkk',
                  open && 'translate-y-[3.5px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'h-px w-full bg-neutral-100 transition-transform duration-500 ease-mkk',
                  open && '-translate-y-[3.5px] -rotate-45'
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && <FullscreenMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function FullscreenMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className='fixed inset-0 z-[8999] bg-ink-900'
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className='container-grid h-full content-between pb-12 pt-32 md:pb-16 md:pt-40'>
        <nav className='col-span-12 flex flex-col gap-2 md:gap-4'>
          {navigation.map((item, i) => (
            <div key={item.href} className='line-mask'>
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '110%' }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  data-cursor='label'
                  data-cursor-label='Go'
                  className='font-display text-5xl font-medium tracking-tight text-neutral-100 transition-colors hover:text-signal-cyan md:text-8xl'
                >
                  {item.label}
                </Link>
              </motion.div>
            </div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          className='col-span-12 mt-16 flex flex-col gap-6 border-t border-ink-700 pt-8 md:flex-row md:items-end md:justify-between'
        >
          <div>
            <p className='font-display text-xs uppercase tracking-[0.25em] text-neutral-500'>
              Get in touch
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor
              className='font-display text-2xl text-neutral-100 hover:text-signal-cyan md:text-3xl'
            >
              {site.email}
            </a>
          </div>
          <div className='flex gap-6'>
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                data-cursor
                className='font-display text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-100'
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
