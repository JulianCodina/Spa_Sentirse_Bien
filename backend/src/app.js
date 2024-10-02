import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(cors({
    origin: 'https://spa-sentirse-bien.netlify.app/', 
    credentials: true,
}))

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
});

export default app