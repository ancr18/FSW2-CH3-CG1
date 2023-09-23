const express = require("express")
const carControllers = require("../controllers/carController")

const router = express.Router()

router.param("id", carControllers.checkId)

router
  .route("/")
  .get(carControllers.getListCars)
  .post(carControllers.checkBody, carControllers.createCar)
router
  .route("/:id")
  .get(carControllers.getDetailCar)
  .put(carControllers.checkKeyUpdate, carControllers.updateCar)
  .delete(carControllers.deleteCar)

module.exports = router
