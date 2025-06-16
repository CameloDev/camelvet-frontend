import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.URL_API || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies to be sent with requests
})
