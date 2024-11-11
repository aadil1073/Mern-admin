import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee');
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = employees.filter((employee) =>
      employee.f_Name.toLowerCase().includes(value) ||
      employee.f_Designation.toLowerCase().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/employee/${id}`);
        setEmployees(employees.filter((employee) => employee._id !== id));
        setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id));
        alert('Employee deleted successfully');
      } catch (err) {
        console.error('Error deleting employee:', err);
        alert('Failed to delete employee');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="#">
              <img src="images/logo.png" alt="Logo" width="25" height="25" />
            </Link>
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee-list">Employee List</Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <span className="navbar-text me-2">{username} - </span>
            <button className="btn btn-link nav-link p-0 text-dark" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-3 d-flex justify-content-end">
        <span className="text-muted">Total Count: {filteredEmployees.length}</span>
      </div>

      <div className="container mt-3" style={{ maxWidth: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 style={{ fontSize: '1.3rem' }}>Employee List</h2>
          <Link to="/create-employee" className="btn btn-success">
            Create Employee
          </Link>
        </div>

        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            placeholder="Search by name or designation..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            style={{ width: '250px' }}
          />
        </div>

        <table className="table table-striped mt-3" style={{ fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>
                    {employee.f_Image ? (
                      <img
                        src={`http://localhost:5000/${employee.f_Image}`}
                        alt="Employee"
                        width="50"
                        height="50"
                        style={{ borderRadius: '5px' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{employee.f_Name}</td>
                  <td>{employee.f_Email}</td>
                  <td>{employee.f_Mobile}</td>
                  <td>{employee.f_Designation}</td>
                  <td>{employee.f_gender}</td>
                  <td>{employee.f_Course.join(', ')}</td>
                  <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex">
                      <Link to={`/edit-employee/${employee._id}`} className="btn btn-warning btn-sm me-2">
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
