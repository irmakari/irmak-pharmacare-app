import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const ApiService = axios.create({
    baseURL: API_URL,
});

// npx json-server --watch data/db.json --port 3001