import axios from "axios";

const api = axios.create({
  baseURL: "https://beim-cafe.liara.run/v1",
});

export default api;
