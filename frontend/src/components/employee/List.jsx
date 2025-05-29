import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import './css/List.css' 

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployee, setFilteredEmployees] = useState(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const responnse = await axios.get(
          "http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          let sno = 1;
          const data = responnse.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            action: (<EmployeeButtons Id={emp._id} />),
          }));
          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (error) {
        console.log(error.message)
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setEmpLoading(false)
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

  if (filteredEmployee) {
  return (
    <div className='employee-list-container'>
      <div className="employee-header">
        <h3 className="employee-title">Manage Employee</h3>
      </div>
      <div className="employee-toolbar">
        
        <Link
          to="/admin-dashboard/add-employee"
          className="add-button"
        >
          Add New Employee
        </Link>
      </div>
      <div className='employee-table'>
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </div>
    </div>
  )
}
}

export default List
