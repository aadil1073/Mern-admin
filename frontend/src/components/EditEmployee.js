import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '',
    f_Image: null,
  });
  const [username, setUsername] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const designationOptions = ['HR', 'Manager', 'Sales'];

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchEmployee();
    fetchCourseOptions();
  }, []);

  // Fetch employee data for editing
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employee/${id}`);
      const employeeData = response.data;
      setForm({
        f_Name: employeeData.f_Name,
        f_Email: employeeData.f_Email,
        f_Mobile: employeeData.f_Mobile,
        f_Designation: employeeData.f_Designation,
        f_gender: employeeData.f_gender,
        f_Course: employeeData.f_Course || '',
        f_Image: null,
      });
    } catch (err) {
      console.error('Error fetching employee details:', err);
    }
  };

  // Fetch unique course options from employees
  const fetchCourseOptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employee');
      const employees = response.data;
      const uniqueCourses = [...new Set(employees.map((emp) => emp.f_Course))];
      setCourseOptions(['MCA', 'BCA', 'BSC',]);
    } catch (err) {
      console.error('Error fetching course options:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => setForm({ ...form, f_Image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);

    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employee updated successfully');
      navigate('/employee-list');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating employee');
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
              <img src="/images/logo.png" alt="Logo" width="25" height="25" />
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

      <div className="container mt-4">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="f_Name" className="form-label">Name</label>
            <input
              type="text"
              name="f_Name"
              value={form.f_Name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="f_Email" className="form-label">Email</label>
            <input
              type="email"
              name="f_Email"
              value={form.f_Email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="f_Mobile" className="form-label">Mobile Number</label>
            <input
              type="text"
              name="f_Mobile"
              value={form.f_Mobile}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="f_Designation" className="form-label">Designation</label>
            <select
              name="f_Designation"
              value={form.f_Designation}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Designation</option>
              {designationOptions.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="f_gender" className="form-label">Gender</label>
            <select
              name="f_gender"
              value={form.f_gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="f_Course" className="form-label">Course</label>
            <select
              name="f_Course"
              value={form.f_Course}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Course</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="f_Image" className="form-label">Img Upload</label>
            <input
              type="file"
              name="f_Image"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
