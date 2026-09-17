'use client'

import { cn } from '@/lib/utils'

/**
 * Marquee — infinite horizontal scroller. Duplicates content for a seamless
 * loop using a CSS transform animation (GPU-friendly).
 */
export function Marquee({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  const row = [...items, ...items]
  return (
    <div className={cn('relative flex overflow-hidden border-y border-ink-700 py-6 md:py-8', className)}>
      <div className='flex shrink-0 animate-marquee items-center'>
        {row.map((item, i) => (
          <span key={i} className='flex items-center'>
            <span className='px-8 font-display text-2xl font-medium tracking-tight text-neutral-200 md:px-14 md:text-5xl'>
              {item}
            </span>
            <span className='h-2 w-2 rounded-full bg-signal-cyan' />
          </span>
        ))}
      </div>
      <div aria-hidden className='flex shrink-0 animate-marquee items-center'>
        {row.map((item, i) => (
          <span key={i} className='flex items-center'>
            <span className='px-8 font-display text-2xl font-medium tracking-tight text-neutral-200 md:px-14 md:text-5xl'>
              {item}
            </span>
            <span className='h-2 w-2 rounded-full bg-signal-cyan' />
          </span>
        ))}
      </div>
    </div>
  )
}
