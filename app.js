// package
const fs = require("fs")
const express = require("express")
const morgan = require("morgan")
const app = express()

// port
const port = process.env.port || 3000

// middleware
app.use(express.json())
app.use(morgan("dev"))

// cars data
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`))

// API CARS

const getListCars = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  })
}

// ROUTER CARS

const carsRouter = express.Router()

carsRouter.route("/").get(getListCars)

app.use("/api/v1/cars", carsRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
