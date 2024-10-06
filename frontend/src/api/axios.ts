import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACK_URL_PROD
    : import.meta.env.VITE_BACK_URL_LOCAL;


console.log("Backend URL:", baseURL);
console.log("Variables de entorno:");
console.log(import.meta.env);

// Definir baseURL dinámicamente según el entorno
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default instance;
