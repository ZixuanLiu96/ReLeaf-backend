const express = require("express");
const { protect } = require("./../controllers/authController");
const { createAdoptions } = require("./../controllers/adoptionController");

const router = express.Router();

router.post("/", protect, createAdoptions);

module.exports = router;
