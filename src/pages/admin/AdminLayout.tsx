import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/destinasi', label: 'Destinasi', icon: '🏖', end: false },
  { to: '/admin/berita', label: 'Berita', icon: '📰', end: false },
  { to: '/admin/event', label: 'Event', icon: '🎉', end: false },
  { to: '/admin/faq', label: 'FAQ', icon: '❓', end: false },
  { to: '/admin/pesan', label: 'Pesan Masuk', icon: '✉️', end: false },
]

export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#021E27' }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col"
        style={{ background: 'rgba(4,53,69,.95)', borderRight: '1px solid rgba(255,255,255,.08)' }}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="serif text-white text-base font-semibold">
            Plesir <span style={{ color: 'var(--sun)' }}>Admin</span>
          </div>
          <div className="text-white/40 text-xs mt-0.5 truncate">{user?.email}</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
              style={({ isActive }) => isActive ? { background: 'rgba(8,131,149,.3)', color: '#fff' } : {}}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
          >
            <span>↩</span> Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
