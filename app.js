// package
const fs = require("fs")
const express = require("express")
const morgan = require("morgan")
const { create } = require("domain")
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

const getDetailCar = (req, res) => {
  const id = req.params.id
  const car = cars.find((el) => el.id === id)
  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: "car not found",
    })
  }

  res.status(200).json({
    status: "success",
    data: { car },
  })
}

const createCar = (req, res) => {
  const newId = cars[cars.length - 1].id + 1
  const newData = Object.assign({ id: newId }, req.body)
  cars.push(newData)
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "success",
      message: "create new car",
      data: {
        newData,
      },
    })
  })
}

const updateCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex((el) => el.id === id)
  if (carIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `${id} is not found`,
    })
  }

  cars[carIndex] = { ...cars[carIndex], ...req.body }

  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        cars: cars[carIndex],
      },
    })
  })
}
// ROUTER CARS

const carsRouter = express.Router()

carsRouter.route("/").get(getListCars).post(createCar)
carsRouter.route("/:id").get(getDetailCar).put(updateCar)

app.use("/api/v1/cars", carsRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
