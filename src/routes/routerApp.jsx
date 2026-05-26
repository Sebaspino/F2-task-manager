import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Board from '../pages/Board'
import TaskCreate from '../pages/TaskCreate'
import TaskEdit from '../pages/TaskEdit'
import { getLocalStorage } from '../helpers/local-storage'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const user = getLocalStorage('user')
  return user ? children : <Navigate to="/" replace />
}

export const routerApp = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Board /> },
      { path: 'create-task', element: <TaskCreate /> },
      { path: 'edit-task/:id', element: <TaskEdit /> },
    ],
  },
]