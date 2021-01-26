import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    /**
     * fetch array of news from beaver api
     */
    fetch("http://151.80.152.11:8080/news/fetchall")
      .then((res) => {
        if (!res.ok) throw res.error();
        res
          .json()
          .then((data) => {
            /**
             * news/fetchall
             * {
             *    success: bool;
             *    error: string;
             *    news: Array<News>;
             *    count: number;
             * }
             */
            if (!data.success) throw data.error;
            setNews(data.news);
          })
          .catch((err) =>
            console.error(`Error while parsing data fetched ${err}`)
          );
      })
      .catch((err) => console.error(`Error while fetching data ${err}`));
  }, []);

  return (
    <>
      <NavBar />
      <header>
        <h1>News</h1>
      </header>
      <div className="wrapper">
        <div className="left-side"></div>
        <div className="main-content">
          {
            /**
             * News {
             *  id: number;
             *  title: string;
             *  content: string;
             *  date: number;
             *  author: string;
             *  likes:number
             * }
             */
            news.map((elem) => {
              return (
                <article id={elem.id}>
                  <h2>{elem.title}</h2>
                  <h3>{elem.author}</h3>
                  <h4>{elem.date}</h4>
                  <p>{elem.content}</p>
                  <p>Like(s): {elem.likes}</p>
                </article>
              );
            })
          }
        </div>
        <div className="right-side"></div>
      </div>
      <Footer />
    </>
  );
};

export default News;
