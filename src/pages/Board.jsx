import { useState, useEffect } from 'react'
import { end_points } from '../services/api'
import { confirmDelete } from '../helpers/alerts'
import { Link } from 'react-router-dom'

const FILTERS = ['Todas', 'Pendiente', 'En Progreso', 'Completada']

const STATUS_STYLES = {
  'Pendiente':   'bg-yellow-50 text-yellow-700 border-yellow-200',
  'En Progreso': 'bg-sky-50 text-sky-700 border-sky-200',
  'Completada':  'bg-green-50 text-green-700 border-green-200',
}

// ✅ PLUS: fechas legibles sin librerías externas
function formatDate(iso) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  return `${d} ${months[parseInt(m, 10) - 1]} ${y}`
}

function Board() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('Todas')
  const [loading, setLoading] = useState(true)
  // ✅ FIX: estado de error de red
  const [error, setError] = useState(null)

  function fetchData() {
    setLoading(true)
    setError(null)
    fetch(end_points.tasks)
      .then((res) => res.json())
      .then((data) => { setTasks(data); setLoading(false) })
      // ✅ FIX: mostrar error al usuario
      .catch(() => { setLoading(false); setError('No se pudo conectar con la API. Verifica tu conexión.') })
  }

  useEffect(() => { fetchData() }, [])

  function deleteTask(id) {
    confirmDelete(
      '¿Eliminar tarea?',
      'Esta acción no se puede revertir.',
      end_points.tasks,
      id,
      fetchData,
    )
  }

  const filtered = filter === 'Todas' ? tasks : tasks.filter((t) => t.estado === filter)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tablero de tareas</h2>
          <p className="text-sm text-slate-600">{tasks.length} tarea{tasks.length !== 1 ? 's' : ''} en total</p>
        </div>
        <Link
          to="/dashboard/create-task"
          className="shrink-0 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors"
        >
          + Nueva tarea
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === f
                ? 'bg-primary text-white border-primary'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* ✅ FIX: estado de error visible */}
        {error ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-3xl">⚠️</p>
            <p className="text-slate-600 font-medium">{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : loading ? (
          <div className="space-y-3 p-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-3">
            <p className="text-3xl">📋</p>
            <p>No hay tareas {filter !== 'Todas' ? `con estado "${filter}"` : 'aún'}.</p>
            {/* ✅ PLUS: CTA cuando no hay tareas */}
            {filter === 'Todas' && (
              <Link
                to="/dashboard/create-task"
                className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors"
              >
                + Crear primera tarea
              </Link>
            )}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full w-full table-auto">
              <thead className="bg-slate-50">
                <tr className="text-left">
                  {['Título', 'Descripción', 'Vencimiento', 'Estado', 'Acciones'].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{item.titulo}</p>
                      <p className="text-xs text-slate-400">ID: {item.id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-700 max-w-xs truncate">{item.descripcion}</p>
                    </td>
                    {/* ✅ PLUS: fecha formateada */}
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-700 whitespace-nowrap">{formatDate(item.fechaVencimiento)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${STATUS_STYLES[item.estado] || 'bg-slate-100 text-slate-600'}`}>
                        {item.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={'/dashboard/edit-task/' + item.id}
                          className="rounded-lg px-3 py-2 text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => deleteTask(item.id)}
                          className="rounded-lg px-3 py-2 text-xs font-semibold border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Board