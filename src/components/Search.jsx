import React, { useEffect, useState, useRef } from "react";
import requests from "../Request";
import axios from "axios";
import { Link } from "react-router-dom";
const Search = () => {
  let ref = useRef(null);
  const [state, setState] = useState({
    val: "",
    searchVal: [],
    showRes: false,
  });

  useEffect(() => {
    let close = (e) => {
      if (!ref.current.contains(e.target)) {
        setState({ showRes: false });
        console.log(ref.current);
      }
    };
    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  });

  const handleChange = (e) => {
    setState({ val: e.target.value });
    if (e.target.value !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=9a0b510f1640282d3bff2775fa3927d2&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        )
        .then((response) => {
          setState({ searchVal: response.data.results, showRes: true });
        })
        .catch((err) => console.log(err));
    } else if (e.target.value === "") setState({ showRes: false });
  };

  // console.log(state.searchVal);

  const moviesList = state?.searchVal?.length
    ? state?.searchVal?.map((movie) => {
        return (
          <>
            {
              <li className=" hover:font-bold cursor-pointer" key={movie.id}>
                <Link to={"/" + movie.id} onClick={state.closeRes}>
                  {movie.title}
                  <>
                    <i style={{ color: "gray", float: "right" }}>
                      [{new Date(movie.release_date).getFullYear()}]
                    </i>
                  </>
                </Link>
              </li>
            }
          </>
        );
      })
    : null;
  return (
    <>
      <input
        className="  absolute text-black  w-[200px] sm:w-[280px] md:w-[340px] lg:w-[380px] border-gray-600 bg-white h-10 px-5  rounded-lg text-sm focus:outline-none "
        type="text"
        name="searchVal"
        onChange={handleChange}
        placeholder="Search for movies/tvshows..."
        // value={state.val}
      />
      {state.showRes && (
        <div className="top-7 z-50 rounded-lg absolute  w-[265px] bg-white text-black ">
          <ul ref={ref}>{moviesList}</ul>
        </div>
      )}
    </>
  );
};

export default Search;
