import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4001', // Use environment variable for flexibility
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure credentials like cookies are sent with requests
});

export const get = (url, params) => instance.get(url, { params });

export const post = (url, data) => instance.post(url, data);

export const put = (url, data) => instance.put(url, data);

export const dele = (url) => instance.delete(url);
