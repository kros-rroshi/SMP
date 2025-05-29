import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/View.css"; 

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const responnse = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          setEmployee(responnse.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      {employee && (
        <div className="employee-view-container">
          <h2 className="employee-view-title">Employee Details</h2>
          <div className="employee-details-grid">
            <div>
              <div className="employee-info-row">
                <p className="label">Name:</p>
                <p className="value">{employee.userId.name}</p>
              </div>
              <div className="employee-info-row">
                <p className="label">Employee ID:</p>
                <p className="value">{employee.employeeId}</p>
              </div>
              <div className="employee-info-row">
                <p className="label">Date of Birth:</p>
                <p className="value">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="employee-info-row">
                <p className="label">Gender:</p>
                <p className="value">{employee.gender}</p>
              </div>
              <div className="employee-info-row">
                <p className="label">Department:</p>
                <p className="value">{employee.department.dep_name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default View;
