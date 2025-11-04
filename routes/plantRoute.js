const express = require("express");
const {
  getAllPlants,
  createPlant,
  getPlant,
  updatePlant,
  deletePlant,
} = require("./../controllers/plantController");

const { protect } = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(protect, getAllPlants).post(createPlant);
router.route("/:plantId").get(getPlant).patch(updatePlant).delete(deletePlant);

module.exports = router;
