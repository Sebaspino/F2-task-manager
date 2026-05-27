import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { end_points } from '../services/api'
import Swal from 'sweetalert2'

const STATUSES = ['Pendiente', 'En Progreso', 'Completada']

function formatDate(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  return `${d} ${months[parseInt(m, 10) - 1]} ${y}`
}

function TaskEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState('')
  const [estado, setEstado] = useState('Pendiente')
  const [loadingData, setLoadingData] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [titleError, setTitleError] = useState('')

  useEffect(() => {
    fetch(end_points.tasks + '/' + id)
      .then((res) => res.json())
      .then((data) => {
        setTitulo(data.titulo)
        setDescripcion(data.descripcion ?? '')
        setFechaVencimiento(data.fechaVencimiento ?? '')
        setEstado(data.estado)
        setLoadingData(false)
      })
      .catch(() => {
        setLoadingData(false)
        Swal.fire({ title: 'Error', text: 'No se pudo cargar la tarea.', icon: 'error' })
      })
  }, [id])

  function updateTask() {
    if (!titulo.trim()) {
      setTitleError('El título no puede estar vacío')
      return
    }
    setTitleError('')
    setIsLoading(true)

    fetch(end_points.tasks + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descripcion, fechaVencimiento, estado }),
    })
      .then((res) => res.json())
      .then(() => {
        // Navegar primero, luego mostrar toast
        navigate('/dashboard')
        Swal.fire({
          title: 'Tarea actualizada',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
        })
      })
      .catch(() => {
        setIsLoading(false)
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo actualizar la tarea. Intenta de nuevo.',
          icon: 'error',
        })
      })
  }

  if (loadingData) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded-lg bg-slate-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Editar tarea</h2>
          <p className="mt-0.5 text-xs text-slate-600">Modifica los campos que necesites</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${
            estado === 'Completada' ? 'bg-green-50 text-green-700 border-green-200' :
            estado === 'En Progreso' ? 'bg-sky-50 text-sky-700 border-sky-200' :
            'bg-yellow-50 text-yellow-700 border-yellow-200'
          }`}>
            {estado}
          </span>
          <Link
            to="/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            onClick={updateTask}
            type="button"
            disabled={isLoading}
            className="rounded-lg px-3 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </button>
        </div>
      </div>

      <form className="p-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-12">
            <p className="text-xs font-semibold text-slate-500">Datos de la tarea</p>
          </div>

          <div className="lg:col-span-9">
            <label className="text-xs font-semibold text-slate-600">Título *</label>
            <input
              value={titulo}
              onChange={(e) => { setTitulo(e.target.value); setTitleError('') }}
              type="text"
              className={`mt-1 w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                titleError ? 'border-red-400' : 'border-slate-300'
              }`}
            />
            {titleError && (
              <p className="mt-1 text-xs text-red-500">{titleError}</p>
            )}
          </div>

          <div className="lg:col-span-3">
            <label className="text-xs font-semibold text-slate-600">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="lg:col-span-9">
            <label className="text-xs font-semibold text-slate-600">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="text-xs font-semibold text-slate-600">
              Fecha de vencimiento
              {fechaVencimiento && (
                <span className="ml-2 font-normal text-slate-400">{formatDate(fechaVencimiento)}</span>
              )}
            </label>
            <input
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              type="date"
              className="mt-1 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default TaskEdit