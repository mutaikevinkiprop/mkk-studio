'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * PageTransition — a cinematic curtain wipe between route changes.
 * On route change: an accent panel sweeps up, content swaps, panel exits.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [transitioning, setTransitioning] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setTransitioning(true)
    const t = setTimeout(() => setTransitioning(false), 900)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className='pointer-events-none fixed inset-0 z-[9998] bg-ink-900'
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className='absolute bottom-8 left-8 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
              mkk Studio
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
