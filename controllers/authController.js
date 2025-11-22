const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// signup
exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.create({ email, password });

    const token = signToken(newUser._id);
    console.log(token);

    res.status(201).json({
      status: "success",
      message: "Account successfully created!",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("Please provide email and password!", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError("Incorrect email or password", 401));

    const correct = await user.correctPassword(password, user.password);

    if (!correct) return next(new AppError("Incorrect email or password", 401));

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      message: "You have successfully logged in!",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// protect
exports.protect = async (req, res, next) => {
  let token;
  // console.log("tokenRequest", req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    // console.log("currentuser", currentUser);

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist!",
          401
        )
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
