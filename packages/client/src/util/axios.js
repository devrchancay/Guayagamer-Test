import axios from "axios";

const baseURL = "http://localhost:3001";

const axiosConfig = { baseURL };

const customAxios = axios.create(axiosConfig);

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    } else {
      return Promise.reject({ errors: [error.message] });
    }
  }
);

export default customAxios;
