import dns from "dns"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import userRoutes from "./route.js"
import cors from "cors"

dotenv.config()

dns.setServers(["1.1.1.1", "8.8.8.8"])

const conncetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "Spotify",
        })

        console.log("✅ MongoDB Connected")
        console.log(`📦 Database: ${mongoose.connection.name}`)
    } catch (error) {
        console.log("❌ MongoDB Connection Failed")
        console.log(error)
    }
}

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/v1", userRoutes)

app.get("/", (req, res) => {
    res.send("Server is working")
})

const port = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`Server is running on port ${port}`)
    conncetDB()
})
