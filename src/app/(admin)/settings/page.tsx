'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const tabs = ['team', 'email', 'notifications', 'integrations']

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('team')

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

      <main className='mx-auto max-w-5xl p-8'>
        <h1 className='mb-8 font-display text-4xl font-semibold text-neutral-100'>Settings</h1>

        <div className='mb-8 flex gap-2 border-b border-ink-700'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-signal-cyan text-signal-cyan'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='rounded-md border border-ink-700 bg-ink-900 p-8'
        >
          <h2 className='mb-4 font-display text-2xl font-semibold capitalize text-neutral-100'>{activeTab}</h2>
          <p className='text-sm text-neutral-400'>
            Configure your {activeTab} preferences here. This section is ready to
            be wired to the database and email services.
          </p>
        </motion.div>
      </main>
    </div>
  )
}