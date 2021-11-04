import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const PORT = process.env.REACT_APP_SERVER_PORT;

const instance = axios.create({
  baseURL: `${BASE_URL}${PORT}/`,
});

export default instance;
