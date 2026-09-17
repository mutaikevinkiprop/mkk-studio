'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useHasFinePointer } from '@/hooks/useHasFinePointer'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { lerp } from '@/lib/utils'

type CursorState = {
  variant: 'default' | 'hover' | 'label' | 'drag'
  label?: string
}

/**
 * CustomCursor — a lerped follower dot with contextual states.
 * - default: small dot
 * - hover (links/buttons): magnified ring
 * - label (projects/nav): magnified blob with text
 * - drag: "Drag" affordance
 *
 * Mounted once at the app root. Disabled on touch and for reduced motion.
 */
export function CustomCursor() {
  const fine = useHasFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const [state, setState] = useState<CursorState>({ variant: 'default' })
  const [hidden, setHidden] = useState(true)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 260, damping: 26, mass: 0.6 })
  const ringY = useSpring(dotY, { stiffness: 260, damping: 26, mass: 0.6 })

  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('mkk-cursor-active')

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      setHidden(false)

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        'a, button, [data-cursor]'
      )
      if (!el) {
        setState({ variant: 'default' })
        return
      }
      const attr = el.getAttribute('data-cursor')
      if (attr === 'label') {
        setState({ variant: 'label', label: el.getAttribute('data-cursor-label') || '' })
      } else if (attr === 'drag') {
        setState({ variant: 'drag', label: 'Drag' })
      } else {
        setState({ variant: 'hover' })
      }
    }

    const onLeave = () => setHidden(true)
    const onDown = () => setState((s) => ({ ...s }))

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mousedown', onDown)

    const loop = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.18)
      current.current.y = lerp(current.current.y, target.current.y, 0.18)
      dotX.set(current.current.x)
      dotY.set(current.current.y)
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('mkk-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousedown', onDown)
      cancelAnimationFrame(raf.current)
    }
  }, [enabled, dotX, dotY])

  if (!enabled) return null

  const size =
    state.variant === 'label' || state.variant === 'drag'
      ? 96
      : state.variant === 'hover'
        ? 56
        : 10

  const isBlob = state.variant === 'label' || state.variant === 'drag'

  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-[9999]'
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.2s ease' }}
    >
      {/* Magnified ring / blob (behind dot) */}
      <motion.div
        className='absolute flex items-center justify-center'
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className='flex items-center justify-center rounded-full'
          animate={{
            width: size,
            height: size,
            backgroundColor:
              state.variant === 'hover'
                ? 'rgba(34,211,238,0.12)'
                : isBlob
                  ? 'rgba(34,211,238,1)'
                  : 'rgba(34,211,238,0)',
            borderColor: isBlob ? 'rgba(34,211,238,0)' : 'rgba(34,211,238,0.9)',
            borderWidth: isBlob ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          {isBlob && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='select-none px-2 text-center font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-navy'
            >
              {state.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Core dot */}
      <motion.div
        className='absolute h-1.5 w-1.5 rounded-full bg-signal-cyan'
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isBlob ? 0 : 1 }}
      />
    </div>
  )
}
