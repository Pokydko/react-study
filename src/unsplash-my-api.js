const apiKey = import.meta.env.VITE_API_UNSPLASH_KEY;
import axios from "axios";

const unsplashApi = async (request, pageNumber = 1, onEachPage = 15) => {
  return await axios({
    method: "GET",
    baseURL: "https://api.unsplash.com",
    url: "/search/photos",
    params: {
      client_id: apiKey,
      query: request,
      page: pageNumber,
      per_page: onEachPage,
    },
  });
};
export default unsplashApi;
