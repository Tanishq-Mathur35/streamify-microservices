import cloudinary from "cloudinary"
import dotenv from 'dotenv'
import express from 'express'
import { sql } from './config/db.js'
import adminRoutes from "./route.js"

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const app = express()

async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS album (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `

        await sql`
        CREATE TABLE IF NOT EXISTS songs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES album(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `

        console.log("Database Initialized successfully!!")
    } catch (error) {
        console.log("Error in initDB:", error)
    }
}

app.use("/api/v1", adminRoutes)

const port = process.env.PORT

initDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
})
