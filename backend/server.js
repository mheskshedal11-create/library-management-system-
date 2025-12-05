import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { dbConnection } from './db/db.js'
import authRouter from './router/auth.router.js'
import morgan from 'morgan'
const app = express()

const PORT = process.env.PORT || 8000
dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})