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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzhhNWFhODY0NDcxNzY2MTc4NDMyNTNhYzlkZmE5MyIsIm5iZiI6MTc0MTc4NDk1NC43NDcsInN1YiI6IjY3ZDE4NzdhODZmZWE2MGFiODFlMjkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ecsoLNrkoWVNapX3IZZM_Z-q8j6pb3eHflPNLNGXgTY",
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
