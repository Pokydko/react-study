const apiKey = import.meta.env.VITE_API_UNSPLASH_KEY;
import axios from "axios";

const unsplashApi = async ({ searchRequest, searchPage, perPage }) => {
  return await axios({
    method: "GET",
    baseURL: "https://api.unsplash.com",
    url: "/search/photos",
    params: {
      client_id: apiKey,
      query: searchRequest,
      page: searchPage,
      per_page: perPage,
    },
  });
};
export default unsplashApi;
