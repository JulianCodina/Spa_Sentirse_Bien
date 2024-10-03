import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import commentRoutes from './routes/comment.routes.js'
import newsRoutes from './routes/news.routes.js'
import bookingRoutes from './routes/booking.routes.js'

const app = express()

app.use(cors({
    origin: 'https://spa--sentirse-bien.netlify.app', 
    credentials: true,
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api",authRoutes)
app.use("/api",commentRoutes)
app.use("/api", newsRoutes)
app.use("/api", bookingRoutes)

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
});

export default app