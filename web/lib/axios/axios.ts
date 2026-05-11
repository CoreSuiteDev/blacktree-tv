import axios from "axios";
import { env } from "@/types/env/env";

export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});