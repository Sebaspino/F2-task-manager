import './Dashboard.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className="container-dashboard">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard