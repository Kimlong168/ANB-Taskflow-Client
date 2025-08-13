import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    let token;
    try {
      token = JSON.parse(localStorage.getItem("token"));
    } catch {
      token = null;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error: ", error.response);
    return error.response;
  }
);

export default axiosClient;
