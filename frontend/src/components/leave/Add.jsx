import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Add.css"; // Importi i CSS-it

const Add = () => {
  const { user } = useAuth();

  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="add-leave-container">
      <h2 className="add-leave-title">Request for Leave</h2>
      <form onSubmit={handleSubmit} className="add-leave-form">
        <div>
          <label className="form-label">Leave Type</label>
          <select
            name="leaveType"
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Department</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>
        <div className="form-grid">
          <div>
            <label className="form-label">From Date</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="form-label">To Date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div>
          <label className="form-label">Description</label>
          <textarea
            name="reason"
            placeholder="Reason"
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default Add;
