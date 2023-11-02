import React from 'react'

const Signup = () => {
  return (
    <div>
        <h1>Create your Account</h1>
        <div>Sign up with Google</div>
        <div> Sign up with Apple</div>
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
        <h4>Login</h4>
    </div>
  )
}

export default Signup