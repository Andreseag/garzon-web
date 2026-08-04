'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Aquí conectas con tu API route de Next.js
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Su correo"
        className="flex-1 bg-white dark:text-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-sans outline-none focus:border-primary"
      />
      <button
        disabled={status === 'loading'}
        className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-sans font-bold capitalize tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {status === 'loading' ? '...' : 'Suscribirse'}
      </button>

      {status === 'success' && (
        <p className="text-[12px] text-green-500">¡Gracias por suscribirse!</p>
      )}
      {status === 'error' && (
        <p className="text-[12px] text-red-500">Hubo un error, intente de nuevo.</p>
      )}
    </form>
  )
}
