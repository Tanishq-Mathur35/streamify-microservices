import dotenv from "dotenv"
import express from "express"
import redis from "redis"
import songRoutes from "./route.js"
import cors from "cors"

dotenv.config()

export const redisClient = redis.createClient({
    url: process.env.REDIS_URL
})

redisClient
    .connect()
    .then(() => console.log("Connected to Redis"))
    .catch(console.error)

const app = express()

app.use(cors())

app.use("/api/v1", songRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
