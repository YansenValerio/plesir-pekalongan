import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (user) { navigate('/admin', { replace: true }); return null }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) { setError(error); return }
    navigate('/admin', { replace: true })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0A4D68 0%, #043545 50%, #088395 100%)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(12px)' }}
      >
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🏛</div>
          <h1 className="serif text-white text-xl font-semibold">Admin</h1>
          <p className="text-white/50 text-sm mt-1">Plesir Pekalongan</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none"
              style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)' }}
              placeholder="admin@email.com"
            />
          </div>
          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none"
              style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)' }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm text-dark transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--sun)' }}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
