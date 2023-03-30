import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const Genres = (props) => {
  const [genres, setGenres] = useState();
  const [gen, setGen] = useState();
  const change = (i) => {
    setGen(i);
    props.category(i);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=9a0b510f1640282d3bff2775fa3927d2"
      )
      .then((res) => {
        setGenres(res?.data?.genres);
      });
  }, []);

  return (
    <>
      <select className="m-auto" onChange={(e) => change(e.target.value)}>
        {genres?.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Genres;
