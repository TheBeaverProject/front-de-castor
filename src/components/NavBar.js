import React from "react";
import { Link } from "react-router-dom";
import LoginControl from "./LoginControl";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/support">Support us</Link>
        </li>
      </ul>
      <LoginControl />
    </nav>
  );
};

export default NavBar;
