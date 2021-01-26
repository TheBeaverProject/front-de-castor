import React, { useState, useEffect } from "react";

const LoginControl = () => {
  // By default we consider the user is not logged in
  // (the opposite is kinda weird right ?)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   // TODO: manage user token from storage 
  });

  if (isLoggedIn) {
    return (
      <div>
        <button href="#dashboard">Dashboard</button>
      </div>
    );
  } else {
    return (
      <div>
        <button href="#login">Login</button>
        <button href="#register">Register</button>
      </div>
    );
  }
};

export default LoginControl;
