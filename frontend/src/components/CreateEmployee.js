import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CreateEmployee.css';
import axios from 'axios';

function CreateEmployee() {
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
  const [error, setError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const fileType = file.type;
      const allowedFileTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; 

      if (!allowedFileTypes.includes(fileType)) {
        setError('Only JPG and PNG files are allowed');
        setForm((prev) => ({ ...prev, f_Image: null }));
        setIsSubmitDisabled(true); 
      } else if (file.size > maxSize) {
        setError('File size exceeds the 5MB limit');
        setForm((prev) => ({ ...prev, f_Image: null }));
        setIsSubmitDisabled(true); 
      } else {
        setForm((prev) => ({ ...prev, f_Image: file }));
        setError(''); 
        setIsSubmitDisabled(false); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('f_Name', form.f_Name);
    formData.append('f_Email', form.f_Email);
    formData.append('f_Mobile', form.f_Mobile);
    formData.append('f_Designation', form.f_Designation);
    formData.append('f_gender', form.f_gender);
    formData.append('f_Course', form.f_Course);
    if (form.f_Image) {
      formData.append('f_Image', form.f_Image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/employee/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      window.alert('New employee added successfully!');
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.error('Error creating employee:', err);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="d-flex">
            <Link className="navbar-brand" to="#">
              <img src="images/logo.png" alt="Logo" width="30" height="30" />
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee-list">Employee List</Link>
              </li>
            </ul>
          </div>

          <div className="d-flex">
            <span className="navbar-text me-3">{username} - </span>
            <button className="btn btn-link nav-link" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} className="form-container">
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="f_Name"
              className="form-control"
              value={form.f_Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              name="f_Email"
              className="form-control"
              value={form.f_Email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Mobile No</label>
            <input
              type="text"
              name="f_Mobile"
              className="form-control"
              value={form.f_Mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Designation</label>
            <select
              name="f_Designation"
              className="form-control"
              value={form.f_Designation}
              onChange={handleChange}
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label>Gender</label>
            <select
              name="f_gender"
              className="form-control"
              value={form.f_gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label>Course</label>
            <select
              name="f_Course"
              className="form-control"
              value={form.f_Course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSC">BSC</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label>Image Upload</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-success submit-btn mt-4" 
            disabled={isSubmitDisabled} 
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
