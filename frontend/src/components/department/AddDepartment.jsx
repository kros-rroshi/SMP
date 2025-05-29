import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/AddDepartment.css";  

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dep_name" className="label">
            Department Name
          </label>
          <input
            type="text"
            id="dep_name"
            name="dep_name"
            onChange={handleChange}
            placeholder="Department Name"
            className="input"
            required
          />
        </div>

        <div className="mt-3">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="textarea"
            rows="4"
          />
        </div>

        <button type="submit" className="button">
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
