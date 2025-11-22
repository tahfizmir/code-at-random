import axios from 'axios';

const client = axios.create({
  baseURL: 'https://code-path-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
