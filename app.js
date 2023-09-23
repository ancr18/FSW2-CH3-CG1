// core module
const fs = require("fs")

// third package module
const express = require("express")
const morgan = require("morgan")

const carRouter = require("./routes/carRoutes")
const app = express()

// port

// middleware
app.use(express.json())
app.use(morgan("dev"))

// cars data

app.use("/api/v1/cars", carRouter)

module.exports = app
