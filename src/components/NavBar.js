import React from "react";

import {useHistory} from 'react-router-dom'

import LoginControl from "./LoginControl";

const NavBar = () => {
  const history = useHistory()
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => history.push("/home")}>Home</button>
        </li>
        <li>
          <button onClick={() => history.push("/news")}>News</button>
        </li>
        <li>
          <button onClick={() => history.push("/Downloads")}>Downloads</button>
        </li>
        <li>
          <button onClick={() => history.push("/contact")}>Contact</button>
        </li>
        <li>
          <button onClick={() => history.push("/supportus")}>Support us</button>
        </li>
      </ul>
      <LoginControl />
    </nav>
  );
};

export default NavBar;
