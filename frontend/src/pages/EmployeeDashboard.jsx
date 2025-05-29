import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'
import "./Pages.css"; 

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='employee-dashboard'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard