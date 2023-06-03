import axios, { AxiosInstance } from "axios";
import { environment } from "../../enviroments/enviroment";

export const createAuthAPI = (): AxiosInstance => {
  const accessToken = localStorage.getItem("accessToken") || "";

  const authAPI = axios.create({
    baseURL: environment.API.auth,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  authAPI.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return authAPI;
};

export const authAPI = createAuthAPI();
