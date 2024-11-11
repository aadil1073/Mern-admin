import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateLoginForm = () => {
    if (!username || !password) {
      alert('Username and password are required');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    const isValid = username === 'Hukum Gupta' && password === '12345'; 

    if (isValid) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      alert('Invalid login details');
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        backgroundColor: '#f0f4f8', 
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <img src="images/logo.png" alt="Logo" style={{ width: '120px' }} />
      </div>

      {/* Login card */}
      <div className="card p-4 shadow" style={{ width: '350px', borderRadius: '8px' }}>
        <h2 className="text-center mb-4" style={{ color: '#333' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark mt-4 w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
