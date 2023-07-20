import axios from "axios";

const api = axios.create({
  baseURL: "https://api.berimcafe.org/v1",
});

export default api;
