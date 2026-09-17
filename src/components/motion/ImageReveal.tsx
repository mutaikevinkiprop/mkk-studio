'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

type ImageRevealProps = {
  /** Optional image src. If omitted a branded placeholder is drawn. */
  src?: string
  alt: string
  className?: string
  imgClassName?: string
  /** Enable subtle parallax as the element passes through the viewport. */
  parallax?: boolean
  /** Clip reveal direction. */
  delay?: number
  accent?: string
  label?: string
}

/**
 * ImageReveal — an element that reveals via a top-down clip mask while the
 * inner image counter-scales, then applies a gentle parallax offset on scroll.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  parallax = true,
  delay = 0,
  accent = '#22D3EE',
  label,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12])

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden bg-ink-800', className)}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          loading='lazy'
          style={parallax ? { y, scale } : undefined}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      ) : (
        <motion.div
          aria-label={alt}
          role='img'
          style={parallax ? { y, scale } : undefined}
          className={cn(
            'flex h-full w-full items-center justify-center',
            imgClassName
          )}
        >
          <Placeholder accent={accent} label={label ?? alt} />
        </motion.div>
      )}
    </motion.div>
  )
}

/** Branded geometric placeholder used until real imagery is supplied. */
function Placeholder({ accent, label }: { accent: string; label: string }) {
  return (
    <div className='relative h-full w-full'>
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `linear-gradient(${accent}22, ${accent}05)`,
        }}
      />
      <svg
        className='absolute inset-0 h-full w-full opacity-[0.18]'
        preserveAspectRatio='none'
        viewBox='0 0 400 400'
      >
        <defs>
          <pattern id='g' width='40' height='40' patternUnits='userSpaceOnUse'>
            <path d='M40 0H0V40' fill='none' stroke={accent} strokeWidth='1' />
          </pattern>
        </defs>
        <rect width='400' height='400' fill='url(#g)' />
      </svg>
      <span className='absolute bottom-4 left-4 font-display text-xs uppercase tracking-[0.25em] text-neutral-400'>
        {label}
      </span>
    </div>
  )
}
