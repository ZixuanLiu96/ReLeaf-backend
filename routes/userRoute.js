const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");

const { signup, login, protect } = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

router.route("/").get(protect, getAllUsers).post(protect, createUser);
router
  .route("/:userId")
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
