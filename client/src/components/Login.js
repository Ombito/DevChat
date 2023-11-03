import React, { useState }  from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:5555/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          setSuccess('Registration successful! You can now log in.');
          setError(null);
          navigate('/homepage')
        } else if (response.status === 401) {
          setError('Invalid email or password. Please check your input.');
          setSuccess(null);
        }
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
        setSuccess(null);
      });
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div></div>
        <h1>Sign in to DevChat</h1>
        <div></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" id="username" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required/>
        </div>
          <button className="login-button" type="submit">Login</button>     
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <div id="checkbox">
        <div className="checkbox-remember">
          <input type="checkbox" id="remember-me" />
          <label>Remember me</label>
        </div>
        <p className="forgot-password">Forgot password?</p>
      </div>
      <Link to="/signup" className="signup-link">
        <h4>
          Don't have an account? <span>Sign up</span>
        </h4>
      </Link>
    </div>
  );
};

export default Login;
