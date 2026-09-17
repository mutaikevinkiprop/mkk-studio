'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { projects } from '@/content/site'

export default function WorkPage() {
  return (
    <div className='pt-28 md:pt-40'>
      <section className='container-grid pb-16 md:pb-24'>
        <div className='col-span-12 md:col-span-10'>
          <p className='mb-6 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
            (Work)
          </p>
          <AnimatedText
            as='h1'
            trigger='mount'
            lines={['Selected', 'projects.']}
            className='font-display text-6xl font-medium tracking-tight text-neutral-100 md:text-9xl'
          />
        </div>
        <div className='col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-12'>
          <p className='text-lg text-neutral-400'>
            A cross-section of brand systems, websites and interactive experiences
            built with our partners.
          </p>
        </div>
      </section>

      <section className='container-grid pb-32'>
        <div className='col-span-12 flex flex-col'>
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className='border-t border-ink-700 py-8 md:py-12'
            >
              <Link
                href='/contact'
                data-cursor='label'
                data-cursor-label='Say hi'
                className='group grid grid-cols-12 items-center gap-6'
              >
                <span className='col-span-2 font-display text-sm text-neutral-500 md:col-span-1'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className='col-span-10 md:col-span-5'>
                  <h2 className='font-display text-3xl font-medium text-neutral-100 transition-transform duration-500 ease-mkk group-hover:translate-x-2 md:text-5xl'>
                    {project.title}
                  </h2>
                  <p className='mt-2 text-sm text-neutral-400'>
                    {project.category} - {project.client}
                  </p>
                </div>
                <div className='col-span-12 md:col-span-4'>
                  <div className='aspect-[16/10] overflow-hidden'>
                    <ImageReveal
                      alt={project.title}
                      accent={project.accent}
                      label={project.category}
                      className='h-full w-full'
                      imgClassName='transition-transform duration-[1.2s] ease-mkk group-hover:scale-[1.06]'
                    />
                  </div>
                </div>
                <span className='col-span-12 font-display text-xs uppercase tracking-[0.2em] text-neutral-500 md:col-span-2 md:text-right'>
                  {project.year}
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
