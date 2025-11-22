import axios from 'axios';
const BASE_URL=location.hostname==='localhost'?"http://localhost:5000":"https://code-path-backend.onrender.com";
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
