import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
      <section>
        <form>
          <input type="email" placeholder='Enter Email'/>
          <input type="password" placeholder='Enter Password'/>
          <button type='submit'>Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login