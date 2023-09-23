// core module
const fs = require("fs")

const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`))

// API CARS

const checkId = (req, res, next, val) => {
  const car = cars.find((el) => el.id === val)
  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `Car with id ${val} not found.`,
    })
  }
  next()
}

const checkBody = (req, res, next) => {
  if (!req.body.plate || !req.body.manufacture) {
    return res.status(400).json({
      status: "failed",
      message: `plate or manufacture are required`,
    })
  }
  next()
}

const checkKeyUpdate = (req, res, next) => {
  const reqData = Object.keys(req.body)

  if (reqData.length === 0) {
    return res.status(400).json({
      status: "failed",
      message: "Key is required",
    })
  }
  next()
}

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
  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "create new car",
        data: {
          newData,
        },
      })
    }
  )
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

  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "success update car",
        data: {
          cars: cars[carIndex],
        },
      })
    }
  )
}

const deleteCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex((el) => el.id === id)
  if (carIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `${id} is not found`,
    })
  }

  cars.splice(carIndex, 1)
  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `success delete id : ${id}`,
        data: null,
      })
    }
  )
}

module.exports = {
  getListCars,
  getDetailCar,
  createCar,
  updateCar,
  deleteCar,
  checkId,
  checkBody,
  checkKeyUpdate,
}
