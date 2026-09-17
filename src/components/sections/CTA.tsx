'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { Magnetic } from '@/components/motion/Magnetic'

/**
 * CTA - full-bleed closing call to action with a subtle scroll-linked
 * background word and a magnetic primary button.
 */
export function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} className='edge-fade relative overflow-hidden py-32 md:py-56'>
      <motion.span
        style={{ x: bgX }}
        aria-hidden
        className='pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[34vw] font-medium leading-none text-ink-800/40 md:text-[22vw]'
      >
        mkk.studio
      </motion.span>

      <div className='container-grid relative z-10'>
        <div className='col-span-12 md:col-span-9'>
          <AnimatedText
            as='h2'
            lines={['Let’s build something', 'worth remembering.']}
            className='font-display text-4xl font-medium tracking-tight text-neutral-100 md:text-8xl'
          />
        </div>
        <div className='col-span-12 mt-12 md:col-span-9'>
          <Magnetic strength={0.5}>
            <Link
              href='/contact'
              data-cursor='label'
              data-cursor-label='Start'
              className='inline-flex items-center gap-4 rounded-md bg-signal-cyan px-8 py-5 font-display text-base font-semibold uppercase tracking-[0.1em] text-ink-navy'
            >
              Start a Project
              <span className='inline-block h-px w-8 bg-ink-navy' />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
