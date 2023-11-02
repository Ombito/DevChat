import React from 'react'

const Login = () => {
  return (
    <div>
        <h1>Login to your Account</h1>
        <div>Signin with Google</div>
        <div> Signin with Apple</div>
        <div>
            <div></div>
            <div>Or</div>
            <div></div>
        </div>
        <form>
            <label>Name</label>
            <input/>
            <label>Username</label>
            <input/>
            <label>Email</label>
            <input/>
            <label>Password</label>
            <input/>
            <label>Re-enter password</label>
            <input/>
            <button>Sign up</button>
        </form>
        <p>Forgot password?</p>
        <h4>Sign up</h4>
    </div>
  )
}

export default Login
