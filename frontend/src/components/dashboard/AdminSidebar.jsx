import { NavLink } from "react-router-dom";
import '../css/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h5>Employee Managament System</h5>
      </div>
      <div className="sidebar-links">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          end
        >
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Leave</span>
        </NavLink>
        
      </div>
    </div>
  );
};

export default AdminSidebar;
