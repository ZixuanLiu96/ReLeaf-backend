const express = require("express");
const { protect } = require("./../controllers/authController");
const {
  createAdoptions,
  getAllAdoptions,
} = require("./../controllers/adoptionController");

const router = express.Router();

router.post("/", protect, createAdoptions);
router.get("/:userId", protect, getAllAdoptions);

module.exports = router;
