import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.aviro24.shop/api/v1",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export default apiClient;
