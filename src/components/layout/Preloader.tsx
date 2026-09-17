'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'

/**
 * Preloader — brand reveal with a percentage counter and a curtain lift.
 * Plays once per session; suppressed for reduced-motion users.
 */
export function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('mkk-loaded')

    if (reduced || seen) {
      setDone(true)
      return
    }

    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.v)),
      onComplete: () => {
        sessionStorage.setItem('mkk-loaded', '1')
        setTimeout(() => setDone(true), 350)
      },
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className='fixed inset-0 z-[10000] flex flex-col justify-between bg-ink-navy p-6 md:p-12'
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className='flex items-center justify-between font-display text-xs uppercase tracking-[0.3em] text-neutral-400'>
            <span>mkk Studio</span>
            <span>Digital Craft</span>
          </div>

          <div className='flex items-end justify-between'>
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className='font-display text-5xl font-medium text-neutral-100 md:text-7xl'
            >
              Loading
            </motion.span>
            <span className='font-display text-6xl font-medium tabular-nums text-signal-cyan md:text-9xl'>
              {count.toString().padStart(3, '0')}
            </span>
          </div>

          <div className='h-px w-full bg-ink-700'>
            <motion.div
              className='h-px bg-signal-cyan'
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
