import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import axios from 'axios';
import '../css/AdminSummary.css';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    };
    fetchSummary();
  }, []);

  if (summary) {
  return (
    <div className="admin-summary">
      <h3>Dashboard Overview</h3>
      <div className="summary-grid">
        <SummaryCard 
          text="Total Employees"
          number={summary.totalEmployees}
        />
        <SummaryCard
          text="Total Departments"
          number={summary.totalDepartments}
        />
        
      </div>

      <div className="leave-section">
        <div className="leave-grid">
          <SummaryCard
            text="Leave"
            number={summary.leaveSummary.appliedFor}
          />
          <SummaryCard
            text="Leave Pending"
            number={summary.leaveSummary.pending}
          /> 
        </div>
      </div>
    </div>
  );
};
};

export default AdminSummary;
