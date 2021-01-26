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
                  <h3>François HOUSSIN</h3>
                  <p>fransoishoussin@gmail.com</p>
                  <p>github.com/Difrancium/</p>
              </article>
              <article>
                  <h3>Augustin BEGUE</h3>
                  <p>augustin.begue@epita.fr</p>
                  <p>github.com/Tagueo</p>
              </article>
              <article>
                  <h3>Baptiste FONTAINE</h3>
                  <p>baptiste.fontaine@epita.fr</p>
                  <p>github.com/Hypaxba</p>
              </article>
              <article>
                  <h3>Paul SPIELMANN</h3>
                  <p>paul.spielmann@epita.fr</p>
                  <p>github.com/paul-spl</p>
              </article>
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    </>
  );
};

export default Contact;
