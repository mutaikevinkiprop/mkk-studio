'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { projects, type Project } from '@/content/site'
import { cn } from '@/lib/utils'

const sizeMap: Record<Project['size'], { span: string; ratio: string }> = {
  large: { span: 'md:col-span-7', ratio: 'aspect-[4/5]' },
  standard: { span: 'md:col-span-5', ratio: 'aspect-[3/4]' },
  tall: { span: 'md:col-span-5', ratio: 'aspect-[3/4]' },
  wide: { span: 'md:col-span-7', ratio: 'aspect-[16/10]' },
}

/**
 * SelectedWork - editorial, asymmetric project grid. Each item reveals with a
 * clip mask, scales gently on hover, and slides metadata into view.
 */
export function SelectedWork() {
  // stagger items so columns offset like the reference
  const offsets = ['md:mt-0', 'md:mt-32', 'md:mt-0', 'md:mt-24', 'md:mt-0', 'md:mt-32']

  return (
    <section id='work' className='edge-fade py-24 md:py-40'>
      <div className='container-grid items-end'>
        <div className='col-span-12 md:col-span-8'>
          <p className='mb-6 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
            (Selected Work)
          </p>
          <AnimatedText
            as='h2'
            lines={['Projects we', 'are proud of.']}
            className='font-display text-4xl font-medium tracking-tight text-neutral-100 md:text-7xl'
          />
        </div>
        <div className='col-span-12 mt-6 md:col-span-4 md:mt-0 md:justify-self-end'>
          <Link
            href='/work'
            data-cursor='label'
            data-cursor-label='All'
            className='group inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.15em] text-neutral-300 hover:text-signal-cyan'
          >
            All Work
            <span className='inline-block h-px w-8 bg-current transition-all duration-500 ease-mkk group-hover:w-14' />
          </Link>
        </div>
      </div>

      <div className='container-grid mt-16 md:mt-28'>
        <div className='col-span-12 grid grid-cols-12 gap-x-5 gap-y-16 md:gap-y-24'>
          {projects.map((project, i) => {
            const cfg = sizeMap[project.size]
            return (
              <motion.article
                key={project.id}
                className={cn(
                  'col-span-12',
                  cfg.span,
                  offsets[i % offsets.length]
                )}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href='/work'
                  data-cursor='label'
                  data-cursor-label='View'
                  className='group block'
                >
                  <div className={cn('relative overflow-hidden', cfg.ratio)}>
                    <ImageReveal
                      alt={project.title}
                      accent={project.accent}
                      label={project.category}
                      className='h-full w-full'
                      imgClassName='transition-transform duration-[1.2s] ease-mkk group-hover:scale-[1.06]'
                    />
                    {/* Year tag */}
                    <span className='absolute right-4 top-4 font-display text-xs uppercase tracking-[0.2em] text-ink-navy mix-blend-difference'>
                      {project.year}
                    </span>
                  </div>

                  <div className='mt-6 flex items-start justify-between gap-4'>
                    <div>
                      <h3 className='font-display text-2xl font-medium text-neutral-100 transition-colors group-hover:text-signal-cyan md:text-3xl'>
                        {project.title}
                      </h3>
                      <p className='mt-1 text-sm text-neutral-400'>{project.category}</p>
                    </div>
                    <span className='mt-2 shrink-0 font-display text-xs uppercase tracking-[0.2em] text-neutral-500'>
                      {project.client}
                    </span>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
