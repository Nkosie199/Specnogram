import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Update this to match your Spring Boot API
});

export default api;
