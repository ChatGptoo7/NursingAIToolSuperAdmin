import axios from "axios";
import {env} from '../config/env'
import { toast } from "react-toastify";
import { decryptApiResponse } from "../utils/transport.crypto";

export const instance = axios.create({
  baseURL: env.API_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true, // IMPORTANT: send cookies automatically
});
instance.defaults.withCredentials = true;
// No need to manually set Authorization header — cookie is sent automatically
instance.interceptors.request.use(
  (config) => {
    // You can still add additional 
    // headers if needed
    return config;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  async (response) => {
    const data = response.data;
 
    if (data?.encrypted && data?.payload) {
      try {
        // Decrypt payload using Web Crypto API
        response.data = await decryptApiResponse(data.payload);
      } catch (err) {
      
        toast.error("Secure data error. Please reload.");
        return Promise.reject(err);
      }
    }
 
    return response;
   
  },
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
 
      localStorage.clear();
      sessionStorage.clear();
 
        window.location.href = "/";
    
    }

    return Promise.reject(error);
  }
);