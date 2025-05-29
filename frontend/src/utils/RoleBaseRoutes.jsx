import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user} = useAuth()

    if(!requiredRole.includes(user.role)) {
       <Navigate to="/unauthorized"/> 
    }
  
    return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoutes