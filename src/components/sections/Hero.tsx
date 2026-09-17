'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { InteractiveSphere } from '@/components/motion/InteractiveSphere'
import { Magnetic } from '@/components/motion/Magnetic'
import { hero } from '@/content/site'

/**
 * Hero - full-viewport interactive opener. Oversized line-masked headline,
 * interactive canvas sphere backdrop, scroll-linked parallax, and a scroll cue.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax: content drifts up + fades as the hero leaves
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sphereY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section
      ref={ref}
      className='relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-28 md:pt-32'
    >
      {/* Interactive backdrop */}
      <motion.div
        style={{ y: sphereY }}
        className='pointer-events-none absolute inset-0 flex items-center justify-center'
      >
        <InteractiveSphere className='h-[120vmin] w-[120vmin] opacity-70' />
      </motion.div>

      {/* Radial vignette to focus the type */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(15,23,42,0.6)_70%,rgba(15,23,42,1)_100%)]' />

      <motion.div style={{ y, opacity }} className='container-grid relative z-10 content-start'>
        <div className='col-span-12 md:col-span-10'>
          <div className='line-mask'>
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className='mb-6 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan md:text-sm'
            >
              {hero.ctaPrimary.label === 'Start a Project' ? 'Creative Development Studio' : ''}
            </motion.p>
          </div>

          <h1 className='font-display font-medium tracking-[-0.04em] text-neutral-100'>
            {hero.headline.map((word, i) => (
              <span key={i} className='line-mask md:inline-block'>
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className='inline-block pr-[0.2em] text-[15vw] leading-[0.92] md:text-[8.5vw]'
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className='container-grid relative z-10 mt-auto items-end'
      >
        <div className='col-span-12 md:col-span-5'>
          <div className='line-mask'>
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className='max-w-md text-base text-neutral-300 md:text-lg'
            >
              {hero.intro}
            </motion.p>
          </div>
        </div>

        <div className='col-span-12 mt-8 flex flex-wrap items-center gap-4 md:col-span-7 md:mt-0 md:justify-end'>
          <Magnetic strength={0.35}>
            <Link
              href={hero.ctaPrimary.href}
              data-cursor='label'
              data-cursor-label='Start'
              className='group inline-flex items-center gap-3 rounded-md bg-signal-cyan px-7 py-4 font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-navy transition-transform duration-300 will-change-transform hover:scale-[1.02]'
            >
              {hero.ctaPrimary.label}
              <span className='inline-block h-px w-6 bg-ink-navy transition-all duration-500 ease-mkk group-hover:w-10' />
            </Link>
          </Magnetic>
          <Link
            href={hero.ctaSecondary.href}
            data-cursor
            className='inline-flex items-center gap-3 rounded-md border border-ink-600 px-7 py-4 font-display text-sm font-medium uppercase tracking-[0.1em] text-neutral-200 transition-colors hover:border-signal-cyan hover:text-signal-cyan'
          >
            {hero.ctaSecondary.label}
          </Link>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className='absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2'
      >
        <span className='font-display text-[10px] uppercase tracking-[0.3em] text-neutral-500'>
          Scroll
        </span>
        <span className='relative h-10 w-px overflow-hidden bg-ink-600'>
          <motion.span
            className='absolute inset-x-0 top-0 h-4 bg-signal-cyan'
            animate={{ y: ['-100%', '250%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
