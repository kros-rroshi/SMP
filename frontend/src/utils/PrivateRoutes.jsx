import React from 'react'
import { useAuth } from '../context/authContext'
import {Navigate} from 'react-router-dom'

const PrivateRoutes = ({children}) => {
  const {user} = useAuth()

  return user ? children : <Navigate to="/login" />
}
export default PrivateRoutes
