import { useState } from 'react'
import { Link } from 'react-router-dom'
import { end_points } from '../services/api'
import { redirect } from '../helpers/alerts'
import Swal from 'sweetalert2'

const STATUSES = ['Pendiente', 'En Progreso', 'Completada']

function TaskCreate() {
  // ✅ FIX: estado de carga para evitar doble submit
  const [isLoading, setIsLoading] = useState(false)

  function createTask(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    if (!data.titulo.trim()) return

    setIsLoading(true)

    fetch(end_points.tasks, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => redirect('Tarea creada correctamente', '/dashboard', 'success'))
      // ✅ FIX: manejo de error de red
      .catch(() => {
        setIsLoading(false)
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo guardar la tarea. Verifica tu conexión e intenta de nuevo.',
          icon: 'error',
        })
      })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Crear tarea</h2>
          <p className="mt-0.5 text-xs text-slate-600">Completa los campos del formulario</p>
        </div>
        <Link
          to="/dashboard"
          className="rounded-lg px-3 py-2 text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </Link>
      </div>

      <form onSubmit={createTask} className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-12">
            <p className="text-xs font-semibold text-slate-500">Datos de la tarea</p>
          </div>

          <div className="lg:col-span-9">
            <label className="text-xs font-semibold text-slate-600">Título *</label>
            <input
              name="titulo"
              type="text"
              required
              placeholder="Ej: Diseñar pantalla de login"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="text-xs font-semibold text-slate-600">Estado</label>
            <select
              name="estado"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="lg:col-span-9">
            <label className="text-xs font-semibold text-slate-600">Descripción</label>
            <textarea
              name="descripcion"
              rows={3}
              placeholder="Descripción opcional de la tarea"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400 resize-none"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="text-xs font-semibold text-slate-600">Fecha de vencimiento</label>
            <input
              name="fechaVencimiento"
              type="date"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* ✅ FIX: botón deshabilitado mientras carga */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 rounded-lg px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white transition-colors flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar tarea'
          )}
        </button>
      </form>
    </div>
  )
}

export default TaskCreate