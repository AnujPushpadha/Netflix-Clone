import React, { useState } from "react";
import Genres from "../components/Genres";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";
const Home = () => {
  const [category_code, setcategory_code] = useState("");
  const category = (i) => {
    // console.log(i);
    setcategory_code(i);
  };
  return (
    <>
      <Main />
      <Genres category={category} />
      <Row
        rowID="1"
        title="UpComing"
        fetchURL={`${requests.requestUpcoming}&page=1&with_genres=${category_code}`}
      />
      <Row
        rowID="2"
        title="Popular"
        fetchURL={`${requests.requestPopular}&page=2&with_genres=${category_code}`}
      />
      <Row
        rowID="3"
        title="Trending"
        fetchURL={`${requests.requestTrending}&page=1&with_genres=${category_code}`}
      />
      <Row
        rowID="4"
        title="Top Rated"
        fetchURL={`${requests.requestTopRated}&page=1&with_genres=${category_code}`}
      />
      <Row
        rowID="5"
        title="Horror"
        fetchURL={`${requests.requestHorror}&page=1&with_genres=${category_code}`}
      />
    </>
  );
};

export default Home;
