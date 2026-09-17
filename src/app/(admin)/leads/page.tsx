'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Lead = {
  id: string
  name: string
  email: string
  company?: string
  message?: string
  status: string
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leads')
      .then((r) => r.json())
      .then((data) => setLeads(data.leads ?? []))
      .catch(() => setLeads([]))
      .finally(() => setLoading(false))
  }, [])

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
        <h1 className='mb-8 font-display text-4xl font-semibold text-neutral-100'>Leads</h1>

        <div className='overflow-x-auto rounded-md border border-ink-700 bg-ink-900'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-ink-700'>
                <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Name</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Email</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Company</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Status</th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-neutral-400'>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className='px-4 py-8 text-center text-sm text-neutral-500'>Loading?</td>
                </tr>
              )}
              {!loading && leads.length === 0 && (
                <tr>
                  <td colSpan={5} className='px-4 py-8 text-center text-sm text-neutral-500'>No leads yet.</td>
                </tr>
              )}
              {leads.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className='border-b border-ink-700 transition-colors hover:bg-ink-800'
                >
                  <td className='px-4 py-3 text-sm text-neutral-200'>{lead.name}</td>
                  <td className='px-4 py-3 text-sm text-neutral-300'>{lead.email}</td>
                  <td className='px-4 py-3 text-sm text-neutral-300'>{lead.company || '?'}</td>
                  <td className='px-4 py-3 text-sm'>
                    <span className='rounded-sm bg-signal-cyan/20 px-3 py-1 text-xs capitalize text-signal-cyan'>
                      {lead.status}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-sm text-neutral-400'>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}