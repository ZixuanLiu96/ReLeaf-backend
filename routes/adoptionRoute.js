const express = require("express");
const { protect } = require("./../controllers/authController");
const {
  createAdoptions,
  getAllAdoptions,
} = require("./../controllers/adoptionController");

const router = express.Router();

router.post("/", protect, createAdoptions);
router.get("/:adoptionId", protect, getAllAdoptions);
router.patch("/:adoptionId", protect);

module.exports = router;
