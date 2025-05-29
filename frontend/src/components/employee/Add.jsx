import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Add.css"; 

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Name */}
          <div>
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Insert Name"
              className="form-input"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Insert Email"
              className="form-input"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Employee ID"
              className="form-input"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="form-label">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="form-label">Department</label>
            <select
              name="department"
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="form-label">Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
