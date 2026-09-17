'use client'

import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { services } from '@/content/site'

/**
 * Services - editorial capability list. Rows reveal on scroll; hovering a row
 * drops an accent line in and slides the content, echoing the reference's
 * list interactions.
 */
export function Services() {
  return (
    <section className='edge-fade py-24 md:py-40'>
      <div className='container-grid'>
        <div className='col-span-12 mb-16 md:col-span-6 md:mb-24'>
          <p className='mb-6 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
            (Capabilities)
          </p>
          <AnimatedText
            as='h2'
            lines={['What we do,', 'and how we do it.']}
            className='font-display text-4xl font-medium tracking-tight text-neutral-100 md:text-6xl'
          />
        </div>

        <div className='col-span-12 md:col-span-6 md:col-start-7 md:pt-24'>
          <p className='text-lg text-neutral-400'>
            A senior team working end-to-end - strategy through production code.
          </p>
        </div>
      </div>

      <div className='container-grid mt-16 md:mt-24'>
        <ul className='col-span-12'>
          {services.map((service, i) => (
            <motion.li
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              data-cursor='label'
              data-cursor-label='View'
              className='group relative grid grid-cols-12 items-start gap-4 border-t border-ink-700 py-8 transition-colors duration-500 hover:border-signal-cyan md:py-12'
            >
              <span className='col-span-2 font-display text-sm text-neutral-500 md:col-span-1'>
                {service.id}
              </span>
              <h3 className='col-span-10 font-display text-2xl font-medium text-neutral-100 transition-transform duration-500 ease-mkk group-hover:translate-x-2 md:col-span-5 md:text-4xl'>
                {service.title}
              </h3>
              <p className='col-span-12 mt-2 max-w-md text-sm text-neutral-400 transition-colors group-hover:text-neutral-300 md:col-span-5 md:col-start-8 md:mt-0 md:text-base'>
                {service.description}
              </p>
              <span className='absolute bottom-0 left-0 h-px w-0 bg-signal-cyan transition-all duration-700 ease-mkk group-hover:w-full' />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
