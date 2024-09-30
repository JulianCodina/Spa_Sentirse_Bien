import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./DB/connection.js";

// Ejecuta la conexión a la base de datos
connectDB();

dotenv.config(); 

const port = process.env.PORT || 3000;

app.listen(port);

console.log("Server en puerto", port);
