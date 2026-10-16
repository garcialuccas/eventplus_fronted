import axios from "axios";

export const SESSION_STORAGE_KEY = "eventplus:session"
export const UNAUTHORIZED_EVENT = "eventplus:unhathorized"

const axiosInstance = axios.create(
    {
        baseURL: "https://localhost:7187/api/",
        timeout: 50000,
        headers: {
            Accept: "application/json"
        }
    }
)

export default axiosInstance;