const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    sparse: true,
    default: "user",
    maxlength: [20, "A username shouldn't over 20 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide you email!"],
    unique: [true, "This email exists, please use another one!"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide you password!"],
    minlength: [8, "Password should at least be 8 characters!"],
    select: false,
  },
  boo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  joinAt: {
    type: Date,
    default: Date.now(),
  },
  profileUrrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dprwwp1ku/image/upload/v1763160044/profile-bg_logwlv.png",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
