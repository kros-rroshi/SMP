import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Detail.css"; 

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const responnse = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          setLeave(responnse.data.leave);
        }
      } catch (error) {
        console.log("Error: " + error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const responnse = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (responnse.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave && (
        <div className="leave-detail-container">
          <h2 className="leave-detail-title">Leave Details</h2>
          <div className="leave-detail-grid">
            <div>
              <div className="leave-detail-row">
                <p className="label">Name:</p>
                <p className="value">{leave.employeeId.userId.name}</p>
              </div>
              <div className="leave-detail-row">
                <p className="label">Employee ID:</p>
                <p className="value">{leave.employeeId.employeeId}</p>
              </div>
              <div className="leave-detail-row">
                <p className="label">Leave Type:</p>
                <p className="value">{leave.leaveType}</p>
              </div>
              <div className="leave-detail-row">
                <p className="label">Reason:</p>
                <p className="value">{leave.reason}</p>
              </div>
              <div className="leave-detail-row">
                <p className="label">Department:</p>
                <p className="value">{leave.employeeId.department.dep_name}</p>
              </div>
              <div className="leave-detail-row">
                <p className="label">Start Date:</p>
                <p className="value">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="leave-detail-row">
                <p className="label">End Date:</p>
                <p className="value">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="leave-detail-row">
                <p className="label">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="action-buttons">
                    <button
                      className="btn-approve"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="value">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
