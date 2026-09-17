'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { stats } from '@/content/site'

/**
 * Manifesto - a scroll-pinned statement. Large type cross-fades word groups
 * as the section is held in view, ending on a stats row.
 */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const opacity1 = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0])
  const y2 = useTransform(scrollYProgress, [0.4, 0.6], [60, 0])
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.55, 1], [0, 1, 1])

  return (
    <section ref={ref} className='relative h-[200vh] edge-fade'>
      <div className='sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden'>
        <div className='container-grid'>
          <div className='col-span-12 md:col-span-10 md:col-start-2'>
            <p className='mb-8 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
              (Studio)
            </p>

            <div className='relative'>
              <motion.div style={{ y: y1, opacity: opacity1 }} className='absolute inset-0'>
                <AnimatedText
                  as='h2'
                  trigger='mount'
                  lines={['We build brands', 'that behave like', 'software.']}
                  className='font-display text-[9vw] font-medium leading-[0.98] tracking-[-0.03em] text-neutral-100 md:text-[2.6vw]'
                />
              </motion.div>

              <motion.div style={{ y: y2, opacity: opacity2 }}>
                <AnimatedText
                  as='h2'
                  trigger='mount'
                  delay={0.9}
                  lines={['Every decision is', 'intentional - from', 'type to easing.']}
                  className='font-display text-[9vw] font-medium leading-[0.98] tracking-[-0.03em] text-neutral-100 md:text-[2.6vw]'
                />
              </motion.div>
            </div>

            <div className='mt-16 grid grid-cols-2 gap-8 md:mt-20 md:grid-cols-4'>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <div className='font-display text-4xl font-medium text-signal-cyan md:text-5xl'>
                    {s.value}
                  </div>
                  <div className='mt-2 text-sm text-neutral-400'>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
