import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-2 bg-light p-3" style={{ minHeight: '100vh' }}>
            <h4>Dashboard</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/create-employee">Create Employee</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee-list">Employee Edit</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-10">
            <h2>Welcome to the Admin Panel</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
