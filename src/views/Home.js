import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

import NavBar from "../components/NavBar";

const Home = () => {
  const [news, setNews] = useState([]);
  /**
   * After component first render
   * fetch all news then change component news state
   * this will update component and render news
   */
  useEffect(() => {
    fetch("http://151.80.152.11:8080/news/summaries")
      .then((res) => {
        if (!res.ok) throw res.error();
        res
          .json()
          .then((data) => {
            if (!data.success) throw data.error;
            setNews(data.newsSummaries);
          })
          .catch((err) =>
            console.error(`Error while parsing data fetched: ${err}`)
          );
      })
      .catch((err) => console.error(`Error while fetching data: ${err}`));
  }, []);

  return (
    <>
      <NavBar />
      <header>
        <h1>Building the Beaver</h1>
      </header>
      <div className="wrapper">
        <div className="left-side"></div>
        <div className="main-content">
          {news.map((elem) => {
            return (
              <article id={elem.id}>
                <h2>
                  {elem.date} {elem.title}
                </h2>
                <h3>{elem.author}</h3>
              </article>
            );
          })}
        </div>
        <div className="right-side"></div>
      </div>
      <Footer />
    </>
  );
};

export default Home;