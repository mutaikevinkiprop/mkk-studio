'use client'

import { useRef, type ElementType } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedTextProps = {
  /** Each string is rendered on its own masked line. */
  lines: string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  /** Delay before the first line animates in (s). */
  delay?: number
  /** Stagger between lines (s). */
  stagger?: number
  /** 'inView' triggers on scroll; 'mount' triggers immediately. */
  trigger?: 'inView' | 'mount'
  once?: boolean
}

/**
 * AnimatedText — cinematic line-by-line mask reveal.
 * Each line slides up from behind a clipping mask, matching the
 * reference site's heading treatment.
 */
export function AnimatedText({
  lines,
  as: Tag = 'div',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = 'inView',
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })
  const active = trigger === 'mount' ? true : inView

  return (
    <Tag ref={ref} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} className={cn('line-mask', lineClassName)} aria-hidden>
          <motion.span
            initial={{ y: '110%' }}
            animate={active ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
