import React from 'react'
// import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'

const MainDashboard = () => {
  return (
    <div>
        {/* <Dashboard /> */}
        <Outlet />
    </div>
  )
}

export default MainDashboard