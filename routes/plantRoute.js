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

router.route("/").get(protect, getAllPlants).post(protect, createPlant);
router
  .route("/:plantId")
  .get(protect, getPlant)
  .patch(protect, updatePlant)
  .delete(protect, deletePlant);

module.exports = router;
