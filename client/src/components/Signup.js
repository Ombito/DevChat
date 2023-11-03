import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:5555/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: fullname,
        username: username,
        email: email,
        gender: gender,
        password: password
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          setSuccess('Registration successful! You can now log in.');
          setError(null);
        } else if (response.status === 401) {
          setError('Invalid email or password. Please check your input.');
          setSuccess(null);
        } else {
          setError('An error occurred. Please try again later.');
          setSuccess(null);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
        setSuccess(null);
      });
  };

  return (
    <div className="signup-container">
      <h1>Create your Account</h1>
      <div className="google-signup">
        <button>SIGN UP WITH GOOGLE</button>
      </div>
      <div className="divider">
        <div></div>
        <div>Or</div>
        <div></div>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter a unique username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>---Select Gender---</option>
            <option>Male</option>
            <option>Female</option>
            <option>Bisexual</option>
          </select>
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Should include unique characters *#!$"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <Link to="/login?" className="login-link">
        <h4 className="login-text">
          Do you have an account? <span>Login</span>
        </h4>
      </Link>
    </div>
  );
};

export default Signup;