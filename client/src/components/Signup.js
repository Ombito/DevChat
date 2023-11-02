import React from 'react';
import './Signup.css';
import { Link } from "react-router-dom";

const Signup = () => {
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
      <form className="signup-form">
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" placeholder='Enter your name' required/>
        </div>
        <div className="input-group">
          <label>Username</label>
          <input type="text" placeholder='Enter a unique username' required/>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder='Enter your email address' required/>
        </div>
        <div className="input-group">
          <label>Date of birth</label>
          <div className="date-inputs">
            <input type="text" placeholder="Month" />
            <input type="text" placeholder="Day" />
            <input type="text" placeholder="Year" />
          </div>
        </div>
        <div className="input-group">
          <label>Gender</label>
          <select>
            <option>Male</option>
            <option>Female</option>
            <option>Bisexual</option>
          </select>
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder='Should include unique characters *#!$' required/>
        </div>
        <div className="input-group">
          <label>Re-enter password</label>
          <input type="password" placeholder='Should include unique characters *#!$' required/>
        </div>
        <button className="signup-button">Sign up</button>
      </form>
      <Link to="/login?" className="login-link">
        <h4 className="login-text">Do you have an account? <span>Login</span></h4>
    </Link>
    </div>
  );
};

export default Signup;
