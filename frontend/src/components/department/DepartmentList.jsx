import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

import "./css/DepartmentList.css";  // Import the CSS here

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const responnse = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (responnse.data.success) {
        let sno = 1;
        const data = responnse.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
        }));
        setDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      {!depLoading && (
        <div className="container">
          <div className="title">
            <h3>Manage Departments</h3>
          </div>
          <div className="topBar">
            <Link to="/admin-dashboard/add-department" className="addButton">
              Add New Department
            </Link>
          </div>
          <div className="dataTableContainer">
            <DataTable columns={columns} data={departments} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
