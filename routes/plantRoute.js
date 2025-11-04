const express = require("express");
const {
  getAllPlants,
  createPlant,
  getPlant,
  updatePlant,
  deletePlant,
} = require("./../controllers/plantController");

const router = express.Router();

router.route("/").get(getAllPlants).post(createPlant);
router.route("/:plantId").get(getPlant).patch(updatePlant).delete(deletePlant);

module.exports = router;
