import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    withCredentials: true, // ✅ important for sending/receiving secure cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
