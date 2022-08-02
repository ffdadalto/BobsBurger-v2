import axios from 'axios'

const api = axios.create({
    withCredentials: false,
    baseURL: 'https://localhost:7060', // Definindo a url base
});

// // Ambiente de Testes
// const api = axios.create({
//     withCredentials: false,
//     baseURL: 'http://www.dadaltocorp.local:3000/', // Definindo a url base
// });


export default api;