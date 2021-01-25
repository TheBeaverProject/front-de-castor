import React, {useState, useEffect} from 'react'

const LoginControl = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    /**
     * From beaver api: /auth/check
     * @returns valid: bool
     */
    fetch("http://151.80.152.11/auth/check")
    .then(res => setIsLoggedIn(res.valid))
    // Token verification failed
    // Kill the backend dev
    .catch(err => console.error(err))
  })

  if(isLoggedIn){
    return (
      <div>
        <button href="#dashboard">Dashboard</button>
      </div>
    )
  } else {
    return (
      <div>
        <button href="#login">Login</button>
        <button href="#register">Register</button>
      </div>
    )
  }
}

export default LoginControl