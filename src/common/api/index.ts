import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7707/v1",
});

export default api;
