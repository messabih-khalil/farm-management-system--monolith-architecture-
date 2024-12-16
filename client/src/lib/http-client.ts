import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Adjust this if your API has a different base URL
});

// Add a request interceptor to include bearer token
api.interceptors.request.use(
    (config) => {
        // Retrieve the token from wherever you store it (e.g., localStorage, state management)
        const token = localStorage.getItem('token'); // Or use your preferred method of token storage

        // If token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default api;
