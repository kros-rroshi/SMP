import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./css/Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h5>Employee Managament System</h5>
      </div>
      <div className="sidebar-links">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          end
        >
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Leaves</span>
        </NavLink>
        
      </div>
    </div>
  );
};

export default Sidebar;
