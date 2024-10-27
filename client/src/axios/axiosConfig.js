import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://evangadi-forum-backend-deployed.onrender.com/api",
  //   baseURL: `http://localhost:${port}/api`,
});

export default axiosInstance;
