import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useParams } from "react-router-dom";
const MovieInfo = () => {
  let id = useParams();
  const [state, setState] = useState({
    movie: {},
    credits: [],
    video: [],
  });

  useEffect(() => {
    fetchMovie();
  }, []);
  const fetchMovie = () => {
    const urlMovie = fetch(
      `https://api.themoviedb.org/3/movie/${id.movie_id}?api_key=9a0b510f1640282d3bff2775fa3927d2&language=en-US`
    );
    const urlCredits = fetch(
      `https://api.themoviedb.org/3/movie/${id.movie_id}/credits?api_key=9a0b510f1640282d3bff2775fa3927d2 `
    );
    const urlVideos = fetch(
      `https://api.themoviedb.org/3/movie/${id.movie_id}/videos?api_key=9a0b510f1640282d3bff2775fa3927d2 `
    );
    const urls = [urlMovie, urlCredits, urlVideos];

    Promise.all(urls)
      .then(([r1, r2, r3]) => Promise.all([r1.json(), r2.json(), r3.json()]))
      .then(([data1, data2, data3]) => {
        setState({
          movie: data1,
          credits: data2,
          video: data3.results,
        });
      })
      .catch((err) => console.log(err));
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const time_convert = (num) => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  console.log(state?.credits?.cast);
  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>

        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${state.movie?.backdrop_path}`}
          alt={state.movie?.title}
        />
        <div className="w-full absolute top-20 opacity-50 hover:opacity-100 flex items-center justify-center"></div>
        <div className=" z-10 absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {state.movie?.title}
          </h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <span className="text-gray-400 text-sm border-r-2 pr-2 ">
            {new Date(state.movie?.release_date).getFullYear()}
          </span>

          <span className="text-gray-400 text-sm border-r-2 pr-2 ml-2">
            {state.movie.runtime && time_convert(state.movie.runtime)}
          </span>

          <span className="vote">
            <span className=" text-black font-bold bg-yellow-400 rounded ml-2">
              IMDb
            </span>
            <span className="text-gray-400 text-sm">
              {state.movie.vote_average}
            </span>
          </span>

          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(state.movie?.overview, 300)}
          </p>
          <p>
            <span className="text-gray-400 text-sm">Genres: </span>
            {state.movie?.genres?.map((genre, i, arr) => {
              //   return ele.name;
              if (i === arr.length - 1)
                return <span key={genre.id}>{genre.name}</span>;
              return <span key={genre.id}>{genre.name}, </span>;
            })}
          </p>

          {state.credits && state.credits.crew?.length > 0 && (
            <>
              <p>
                <span className="text-gray-400 text-sm">Director: </span>{" "}
                {state.credits.crew[0].name}
              </p>
            </>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-white font-bold md:text-xl p-4">Cast</h1>
      </div>

      <div className="lists">
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          >
            <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ">
              {state.credits.cast &&
                state.credits.cast.map((cast, i) => (
                  <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                    <span key={cast.cast_id}>
                      <img
                        alt={cast.cast_id}
                        className="w-full h-auto block rounded-full"
                        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      />
                    </span>

                    <div
                      onClick={() => play(item.id)}
                      className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white"
                    >
                      <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                        {cast?.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <MdChevronRight
            onClick={slideRight}
            className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
        </div>

        <br />
        <h2 className="text-2xl  font-bold" style={{ marginLeft: "25px" }}>
          Trailer
        </h2>
        {state.video.length ? (
          <div className="video">
            <iframe
              src={`https://www.youtube.com/embed/${state.video[0].key}`}
              title={state.video[0].name}
              frameBorder="0"
              allowFullScreen
              style={{ marginLeft: "45px" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MovieInfo;
