// src/utils/axios.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if deployed
});

export default API;
