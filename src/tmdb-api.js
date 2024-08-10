const api_read_access_token = import.meta.env.VITE_API_TMDB_TOKEN;
import axios from "axios";

export default async function tmdbApi({ path, searchRequest, page }) {
  const request = {
    method: "GET",
    baseURL: "https://api.themoviedb.org",
    url: `/3/${path}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_read_access_token}`,
    },
  };
  if (path.includes("search")) {
    request.params = {
      query: searchRequest,
      include_adult: false,
      page: page,
    };
  } else if (path.includes("trending")) {
    request.params = {
      page: page,
      language: "en-US",
    };
  }

  return await axios(request);
}
