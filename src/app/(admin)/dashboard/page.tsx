'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const stats = [
  { label: 'Total Leads', value: '24' },
  { label: 'This Month', value: '8' },
  { label: 'Converted', value: '3' },
  { label: 'Pending', value: '5' },
]

const rows = [1, 2, 3, 4, 5]

export default function DashboardPage() {
  return (
    <div className='min-h-screen bg-ink-navy'>
      <nav className='border-b border-ink-700 bg-ink-900 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='font-display text-lg font-semibold text-signal-cyan'>
            mkk Studio
          </Link>
          <div className='flex gap-6'>
            <Link href='/dashboard' className='text-sm text-neutral-300 hover:text-signal-cyan'>Dashboard</Link>
            <Link href='/leads' className='text-sm text-neutral-300 hover:text-signal-cyan'>Leads</Link>
            <Link href='/settings' className='text-sm text-neutral-300 hover:text-signal-cyan'>Settings</Link>
          </div>
        </div>
      </nav>

      <main className='p-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className='mb-8 font-display text-4xl font-semibold text-neutral-100'>Dashboard</h1>

          <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-4'>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className='rounded-md border border-ink-700 bg-ink-900 p-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <p className='mb-2 text-sm text-neutral-400'>{s.label}</p>
                <p className='font-display text-3xl font-semibold text-neutral-100'>{s.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className='rounded-md border border-ink-700 bg-ink-900 p-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className='mb-6 font-display text-2xl font-semibold text-neutral-100'>Recent Leads</h2>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-ink-700'>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Name</th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Email</th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Company</th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((i) => (
                    <tr key={i} className='border-b border-ink-700 transition-colors hover:bg-ink-800'>
                      <td className='px-4 py-3 text-sm text-neutral-300'>Lead {i}</td>
                      <td className='px-4 py-3 text-sm text-neutral-300'>lead{i}@example.com</td>
                      <td className='px-4 py-3 text-sm text-neutral-300'>Company {i}</td>
                      <td className='px-4 py-3 text-sm'>
                        <span className='rounded-sm bg-signal-cyan/20 px-3 py-1 text-xs text-signal-cyan'>New</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}