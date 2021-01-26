import React from "react";
import NavBar from "../components/NavBar";

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="wrapper">
        <div className="left-side"></div>
        <div className="main-content">
          <div className="contact-container">
              <article>
                  <h3>François Houssin</h3>
                  <p>fransoishoussin@gmail.com</p>
                  <p>github.com/Difrancium/</p>
              </article>
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    </>
  );
};

export default Contact;
