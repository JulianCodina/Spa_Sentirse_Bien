import express from 'express'
import cors from 'cors'
import morgan from 'morgan'


const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

export default app