import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const PORT = process.env.REACT_APP_SERVER_PORT;

const instance = axios.create({
  baseURL: `${BASE_URL}${PORT}/`,
});

instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  return response.data;
});

export default instance;
