import axios from 'axios'

const baseURL = import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.BACK_URL_PROD
    : import.meta.env.BACK_URL_LOCAL

// Definir baseURL dinámicamente según el entorno
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export default instance
