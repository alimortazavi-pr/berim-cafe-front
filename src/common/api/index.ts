import axios from "axios";

const api = axios.create({
  baseURL: "https://api-berim-cafe.cyclic.cloud/v1",
});

export default api;
