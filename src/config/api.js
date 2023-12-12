import axios from "axios";

// Create base URL API
export const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};