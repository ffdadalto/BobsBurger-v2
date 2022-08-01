import axios from 'axios'

const api = axios.create({
    withCredentials: false,
    baseURL: 'https://localhost:7060', // Definindo a url base
});

export default api;