import React from "react";

import './NavBar.css'

class NavBar extends React.Component {
  // Fetch session info for login control ?
  // Why the f should I do it here and not directly
  // in the appropriate component ? :thonk:
  // TODO: Maybe remove that shit ?
  componentDidMount() {}

  render() {
    // TODO: Add login control on left side
    return (
      <nav>
        <ul>
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
          <li>
            <a href="#Support">Support us</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
