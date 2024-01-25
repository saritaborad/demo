import axios from "axios";
import { API_PATH } from "./const";

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
axiosInstance.defaults.withCredentials = true;
// axiosInstance.interceptors.request.use(
//  (config) => {
//   let token = document.cookie;
//   if (token) {
//    config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
//  },
//  (error) => {
//   return Promise.reject(error);
//  }
// );

export const login = (data) => {
 return axiosInstance
  .post(API_PATH.login, data)
  .then((res) => res)
  .catch((error) => error.response);
};

export const register = (data) => {
 return axiosInstance
  .post(API_PATH.register, data)
  .then((res) => res)
  .catch((error) => error.response);
};

export const getAllPost = () => {
 return axiosInstance
  .post(API_PATH.getAllPost)
  .then((res) => res)
  .catch((error) => error.response);
};

export const createPost = (data) => {
 return axiosInstance
  .post(API_PATH.createPost, data)
  .then((res) => res)
  .catch((error) => error.response);
};

export const deletePost = (data) => {
 return axiosInstance
  .post(API_PATH.deletePost, data)
  .then((res) => res)
  .catch((error) => error.response);
};

export const editPost = (data) => {
 return axiosInstance
  .post(API_PATH.editPost, data)
  .then((res) => res)
  .catch((error) => error.response);
};
