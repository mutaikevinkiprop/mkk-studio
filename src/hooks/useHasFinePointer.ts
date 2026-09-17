'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true when the device has a fine pointer + hover capability.
 * Used to gate the custom cursor and magnetic hover behaviour.
 */
export function useHasFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}
