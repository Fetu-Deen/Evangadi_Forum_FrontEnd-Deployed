import axios from "axios";
const port = import.meta.env.VITE_PORT;

const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}/api`,
});

export default axiosInstance;
