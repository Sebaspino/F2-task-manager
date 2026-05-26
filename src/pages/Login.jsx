import { useState } from 'react'
import { saveLocalStorage } from '../helpers/local-storage'
import { redirect } from '../helpers/alerts'

const DEPARTMENTS = ['Desarrollo', 'Diseño', 'Marketing', 'Recursos Humanos', 'Ventas', 'Soporte']

const Login = () => {
  const [getName, setName] = useState('')
  const [getDept, setDept] = useState(DEPARTMENTS[0])
  const [getError, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function signIn(e) {
    e.preventDefault()
    if (!getName.trim()) {
      setError('El nombre de usuario es obligatorio')
      return
    }

    setIsLoading(true)
    
    setTimeout(() => {
      saveLocalStorage('user', { 
        name: getName.trim(), 
        department: getDept 
      })
      redirect(getName.trim() + ' — ¡Bienvenido a Workspace!', '/dashboard', 'success')
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl mb-6 border border-white/20">
            <span className="text-4xl">📋</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Workspace</h1>
          <p className="text-indigo-300 mt-2 text-lg">Gestiona tu equipo con eficiencia</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-2">Iniciar sesión</h2>
          <p className="text-slate-400 mb-8">Accede a tu tablero de tareas</p>

          <form onSubmit={signIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={getName}
                onChange={(e) => { 
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-white/5 border border-white/20 focus:border-indigo-400 text-white placeholder:text-slate-500 rounded-2xl px-5 py-4 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Departamento
              </label>
              <select
                value={getDept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full bg-white/5 border border-white/20 focus:border-indigo-400 text-white rounded-2xl px-5 py-4 outline-none transition-all"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d} className="bg-slate-900 text-white">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {getError && (
              <p className="text-red-400 text-sm font-medium">{getError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-indigo-800 transition-all text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>Procesando<span className="animate-pulse">...</span></>
              ) : (
                <>Entrar al tablero →</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          © 2026 Workspace Task Manager. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

export default Login