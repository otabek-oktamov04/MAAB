import axios, { AxiosInstance } from "axios";
import { environment } from "../../enviroments/enviroment";

export const publicAPI: AxiosInstance = axios.create({
  baseURL: environment.API.auth,
});

export const userAPI: AxiosInstance = axios.create({
  baseURL: "https:///api.staging.innmall.uz/api/v1/",
});
