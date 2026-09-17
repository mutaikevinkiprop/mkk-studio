'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { projects } from '@/content/site'

/**
 * HorizontalShowcase - a pinned section where vertical scroll drives a
 * horizontal track of project cards. A signature reference interaction.
 */
export function HorizontalShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })

  // Track moves right-to-left as the section is pinned
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-72%'])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} className='relative h-[300vh] edge-fade'>
      <div className='sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden'>
        <div className='container-grid mb-10'>
          <div className='col-span-12 flex items-end justify-between'>
            <p className='font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
              (In Motion)
            </p>
            <p className='font-display text-xs uppercase tracking-[0.2em] text-neutral-500'>
              02 / 03
            </p>
          </div>
        </div>

        <motion.div style={{ x }} className='flex gap-6 pl-[clamp(1.25rem,5vw,5rem)] will-change-transform'>
          {projects.map((project) => (
            <div
              key={project.id}
              className='relative h-[52vh] w-[78vw] shrink-0 md:h-[58vh] md:w-[40vw]'
            >
              <ImageReveal
                alt={project.title}
                accent={project.accent}
                label={project.category}
                className='h-full w-full'
              />
              <div className='mt-5 flex items-center justify-between'>
                <h3 className='font-display text-xl text-neutral-100 md:text-2xl'>
                  {project.title}
                </h3>
                <span className='font-display text-xs uppercase tracking-[0.2em] text-neutral-500'>
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* progress bar */}
        <div className='container-grid mt-10'>
          <div className='col-span-12 h-px w-full bg-ink-700 md:col-span-6'>
            <motion.div className='h-px bg-signal-cyan' style={{ width: progress }} />
          </div>
        </div>
      </div>
    </section>
  )
}
