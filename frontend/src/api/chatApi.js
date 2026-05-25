// API calls to backend — built in Step 5
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export default api;
