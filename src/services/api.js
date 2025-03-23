const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_MOVIEDB_BEARER_TOKEN,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  const data = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${
      import.meta.env.VITE_MOVIEDB_API_KEY
    }&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};
