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
  request.params = path.includes("search")
    ? {
        query: searchRequest,
        include_adult: false,
        page: page,
      }
    : {
        page: page,
        language: "en-US",
      };

  return await axios(request);
}
