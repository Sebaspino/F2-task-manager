import { useState } from 'react'
import { getLocalStorage, removeLocalStorage } from '../helpers/local-storage'
import { redirect } from '../helpers/alerts'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  // ✅ FIX: leer dentro del componente, no a nivel de módulo
  const auth = getLocalStorage('user')
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  function logout() {
    removeLocalStorage('user')
    redirect('Cerrando sesión...', '/', 'info')
  }

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
        pathname === to
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <>
      {/* Botón hamburguesa — solo visible en móvil */}
      <button
        onClick={() => setOpen(true)}
        className="hamburger-btn"
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Overlay oscuro en móvil */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`container-sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-user">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shrink-0">
              {auth?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-slate-900 truncate">{auth?.name}</h2>
              <p className="text-xs text-slate-500 truncate">{auth?.department}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {navLink('/dashboard', '📋 Tablero')}
          {navLink('/dashboard/create-task', '➕ Nueva tarea')}
        </nav>

        <button
          onClick={logout}
          className="logout-btn"
        >
          🚪 Cerrar sesión
        </button>
      </aside>
    </>
  )
}

export default Sidebar