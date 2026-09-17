'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useHasFinePointer } from '@/hooks/useHasFinePointer'
import { cn } from '@/lib/utils'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** How strongly the element is pulled toward the cursor (0–1). */
  strength?: number
}

/**
 * Magnetic — element drifts toward the cursor on hover, then springs back.
 * Used on the primary CTA and nav actions.
 */
export function Magnetic({ children, className, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useHasFinePointer()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  function handleMove(e: React.MouseEvent) {
    if (!fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mx = e.clientX - (rect.left + rect.width / 2)
    const my = e.clientY - (rect.top + rect.height / 2)
    x.set(mx * strength)
    y.set(my * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}
