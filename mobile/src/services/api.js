import axios from 'axios';

const api = axios.create({
  // Expo IP address + Node server port
  baseURL: 'http://192.168.0.5:3333'
})

export default api;