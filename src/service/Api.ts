import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: "https://localhost:7187/api/",
        timeout: 50000,
    }
)

export default axiosInstance;