'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { Magnetic } from '@/components/motion/Magnetic'
import { site } from '@/content/site'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className='pt-28 md:pt-40'>
      <section className='container-grid pb-16 md:pb-24'>
        <div className='col-span-12 md:col-span-8'>
          <p className='mb-6 font-display text-xs uppercase tracking-[0.3em] text-signal-cyan'>
            (Contact)
          </p>
          <AnimatedText
            as='h1'
            trigger='mount'
            lines={['Start a', 'project.']}
            className='font-display text-6xl font-medium tracking-tight text-neutral-100 md:text-9xl'
          />
        </div>
        <div className='col-span-12 mt-8 md:col-span-4 md:mt-0 md:pt-12'>
          <p className='text-sm uppercase tracking-[0.2em] text-neutral-500'>Email</p>
          <a href={`mailto:${site.email}`} data-cursor className='text-lg text-neutral-200 hover:text-signal-cyan'>
            {site.email}
          </a>
          <p className='mt-6 text-sm uppercase tracking-[0.2em] text-neutral-500'>Studio</p>
          <p className='text-lg text-neutral-200'>{site.location}</p>
        </div>
      </section>

      <section className='container-grid pb-32'>
        <form onSubmit={onSubmit} className='col-span-12 md:col-span-8 md:col-start-3'>
          <div className='grid grid-cols-12 gap-x-6 gap-y-8'>
            <Field label='Name' name='name' value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label='Email' name='email' type='email' value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field label='Company' name='company' value={form.company} onChange={(v) => setForm({ ...form, company: v })} span='col-span-12' />
            <Field label='Message' name='message' textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />

            <div className='col-span-12 flex flex-wrap items-center gap-6'>
              <Magnetic strength={0.35}>
                <button
                  type='submit'
                  disabled={status === 'sending'}
                  data-cursor='label'
                  data-cursor-label='Send'
                  className='inline-flex items-center gap-3 rounded-md bg-signal-cyan px-7 py-4 font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-navy disabled:opacity-60'
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </Magnetic>
              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-sm text-signal-cyan'>
                  Thanks — we’ll be in touch shortly.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-sm text-red-400'>
                  Something went wrong. Please email us directly.
                </motion.p>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
  span = 'col-span-12 md:col-span-6',
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  textarea?: boolean
  span?: string
}) {
  const base =
    'w-full border-b border-ink-600 bg-transparent py-3 text-lg text-neutral-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-signal-cyan'
  return (
    <label className={`${span} block`}>
      <span className='mb-2 block font-display text-xs uppercase tracking-[0.2em] text-neutral-500'>
        {label} {required && <span className='text-signal-cyan'>*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </label>
  )
}
