import axios from "axios";

const api = axios.create({
  baseURL: "https://berim-cafe-users-back-production.up.railway.app/v1",
});

export default api;
