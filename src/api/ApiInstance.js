import axios from 'axios'

let urlbase = '';
switch (import.meta.env.MODE) { // Verifica se é modo de produção ou desenvolvimento
    case 'development':
        urlbase = 'https://localhost:7060';
        break;
    case 'production':
        // urlbase = 'http://www.dadaltocorp.local:3000/';
        urlbase = 'http://144.22.183.99:3000/';
        break;
    default:
        urlbase = 'https://localhost:7060';
        break;
}

const api = axios.create({
    withCredentials: false,
    baseURL: urlbase, // Definindo a url base
});

export default api;