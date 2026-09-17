'use client'

import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { Marquee } from '@/components/motion/Marquee'
import { about, stats } from '@/content/site'

export default function AboutPage() {
  return (
    <div className='pt-28 md:pt-40'>
      <section className='container-grid pb-20 md:pb-32'>
        <div className='col-span-12 md:col-span-11'>
          <p className='mb-6 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
            (Studio)
          </p>
          <AnimatedText
            as='h1'
            trigger='mount'
            lines={about.headline.split(' ').length > 4 ? ['We build brands', 'that behave', 'like software.'] : [about.headline]}
            className='font-display text-5xl font-medium tracking-tight text-neutral-100 md:text-8xl'
          />
        </div>
      </section>

      <section className='container-grid pb-24 md:pb-40'>
        <div className='col-span-12 md:col-span-6 md:col-start-7'>
          {about.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className='mb-6 text-lg text-neutral-300 md:text-xl'
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      <Marquee items={['Precision', 'Clarity', 'Craft', 'Partnership']} />

      <section className='container-grid py-24 md:py-40'>
        <ul className='col-span-12 grid grid-cols-12 gap-y-12'>
          {about.values.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className='col-span-12 border-t border-ink-700 pt-6 md:col-span-3'
            >
              <h3 className='font-display text-2xl font-medium text-neutral-100'>{v.title}</h3>
              <p className='mt-3 text-sm text-neutral-400'>{v.body}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className='container-grid border-t border-ink-700 py-16'>
        <div className='col-span-12 grid grid-cols-2 gap-8 md:grid-cols-4'>
          {stats.map((s) => (
            <div key={s.label} className='col-span-1'>
              <div className='font-display text-4xl font-medium text-signal-cyan md:text-6xl'>
                {s.value}
              </div>
              <div className='mt-2 text-sm text-neutral-400'>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
