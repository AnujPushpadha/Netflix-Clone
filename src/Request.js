const key = "9a0b510f1640282d3bff2775fa3927d2";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  requestSearch: `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=iron&page=1&include_adult=false`,
};

export default requests;

// requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&with_genres=36`,
// https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=iron&page=1&include_adult=false

// `
// https://api.themoviedb.org/3/search/multi?api_key=9a0b510f1640282d3bff2775fa3927d2&language=en-US&query=${e.target.value}&page=1&include_adult=false`;
