import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  const { data } = await axios.get<MoviesResponse>(BASE_URL, {
    params: { query, page },
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
  });
  return data;
}
