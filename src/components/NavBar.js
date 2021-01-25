import React from "react";
import LoginControl from "./LoginControl";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#support">Support us</a>
        </li>
      </ul>
      <LoginControl />
    </nav>
  );
};

export default NavBar;
