import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  //baseURL: 'https://spa-sentirse-bien-ogte.onrender.com/api',
  withCredentials: true,
});

export default instance;
