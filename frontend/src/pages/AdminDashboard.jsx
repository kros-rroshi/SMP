import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'
import "./Pages.css"; 

const AdminDashboard = () => {
  const {user} = useAuth()
 
  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='admin-dashboard'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard