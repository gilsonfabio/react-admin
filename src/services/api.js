import axios from 'axios';

const api = axios.create({baseURL: 'https://backcaldascard.vercel.app/' });
//const api = axios.create({baseURL: 'http://localhost:3333' });
//const api = axios.create({baseURL: 'http://82.180.162.1:3333' });
export default api;
