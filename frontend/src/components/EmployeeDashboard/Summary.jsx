import React from 'react'
import { useAuth } from '../../context/authContext'
import './css/Summary.css'

const SummaryCard = () => {
  const { user } = useAuth()

  return (
    <div className="summary-container">
      <div className="summary-card">
        <div className="summary-text">
          <p className="welcome">Welcome Back</p>
          <p className="username">{user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
