const express = require("express");
const { protect } = require("./../controllers/authController");
const {
  createAdoptions,
  getAllAdoptions,
  editAdoption,
} = require("./../controllers/adoptionController");

const router = express.Router();

router.post("/", protect, createAdoptions);
router.get("/", protect, getAllAdoptions);
router.patch("/:adoptionId", protect, editAdoption);

module.exports = router;
