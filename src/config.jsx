export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "cf0bbb273d3479fb49e46923cc467ef9";
const tmdpEndPoint = "https://api.themoviedb.org/3/movie";
const tmdpEndPointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdpApi = {
  getMovieList: (type, page) =>
    `${tmdpEndPoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (movieId) => `${tmdpEndPoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdpEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieBanner: (type) => `${tmdpEndPoint}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdpEndPointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
