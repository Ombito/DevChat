import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-header">
        <div></div>
        <h1>Sign in to DevChat</h1>
        <div></div>
      </div>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input type="text" id="username" placeholder='Enter your username' required/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" id="password" placeholder='Enter your password' required/>
        </div>
        <Link to="/homepage">
          <button className="login-button">Login</button>
        </Link>
      </form>
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
