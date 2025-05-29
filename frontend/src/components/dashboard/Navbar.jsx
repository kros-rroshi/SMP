import React from 'react'
import { useAuth } from '../../context/authContext'
import '../css/Navbar.css'


const Navbar = () => {
    const { user, logout } = useAuth()

    return (
        <div className="navbar">
            <p>Welcome <b>{user.name}</b></p>
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar
