'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * InteractiveSphere — a dependency-free canvas "wireframe globe" that
 * reacts to pointer movement and rotation. Renders Signal-Cyan points and
 * connective lines on an Ink-Navy field. GPU-light, DPR-aware, paused
 * off-screen, and disabled for reduced-motion users.
 */
export function InteractiveSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let visible = true

    const POINTS = 260
    const R = 1
    const pts: { x: number; y: number; z: number }[] = []
    for (let i = 0; i < POINTS; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / POINTS)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      pts.push({
        x: R * Math.sin(phi) * Math.cos(theta),
        y: R * Math.sin(phi) * Math.sin(theta),
        z: R * Math.cos(phi),
      })
    }

    const pointer = { x: 0, y: 0 }
    const rot = { x: 0, y: 0 }
    const targetRot = { x: 0, y: 0 }

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function project(p: { x: number; y: number; z: number }, time: number) {
      // rotate
      const cx = Math.cos(rot.x)
      const sx = Math.sin(rot.x)
      const cy = Math.cos(rot.y)
      const sy = Math.sin(rot.y)

      let x = p.x * cy - p.z * sy
      let z = p.x * sy + p.z * cy
      let y = p.y * cx - z * sx
      z = p.y * sx + z * cx

      // breathe
      const scale = (Math.min(width, height) * 0.32) * (1 + Math.sin(time * 0.001) * 0.02)
      const perspective = 1.8
      const f = perspective / (perspective + z)
      return {
        x: width / 2 + x * scale * f,
        y: height / 2 + y * scale * f,
        z,
        f,
      }
    }

    function draw(time: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      // smooth follow
      targetRot.y += (pointer.x * 0.6 - targetRot.y) * 0.05
      targetRot.x += (pointer.y * 0.4 - targetRot.x) * 0.05
      rot.y = time * 0.00012 + targetRot.y
      rot.x = Math.sin(time * 0.0001) * 0.2 + targetRot.x

      const projected = pts.map((p) => project(p, time))

      // connective lines between near points
      ctx.lineWidth = 0.5
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 9000) {
            const alpha = (1 - d2 / 9000) * 0.18 * ((a.f + b.f) / 2)
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // points
      for (const p of projected) {
        const r = 1.1 * p.f
        const alpha = 0.35 + p.f * 0.5
        ctx.fillStyle = `rgba(34,211,238,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop(time: number) {
      if (visible) draw(time)
      raf = requestAnimationFrame(loop)
    }

    function onPointer(e: PointerEvent) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(canvas)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      io.disconnect()
    }
  }, [reduced])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
