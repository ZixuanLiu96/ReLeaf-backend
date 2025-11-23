const Adoption = require("./../models/adoptionModel");
const AppError = require("./../utils/appError");
const Plant = require("./../models/plantModel");

exports.createAdoptions = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // console.log(userId);

    const { plantId, message } = req.body;
    const plant = await Plant.findById(plantId);
    if (!plant) return next(new AppError("Plant not fount!", 404));
    console.log(plant.status);

    if (plant.status !== "available")
      return next(new AppError("This plant is unavailable!", 400));

    const adoption = await Adoption.create({
      plantId,
      userId,
      message,
      adoptedAt: Date.now(),
      status: "active",
    });

    plant.status = "pending";
    plant.adoptedBy = userId;
    // setTimeout(() => {
    //   plant.status = "adopted";
    // }, 10000);
    plant.save();

    res.status(201).json({
      status: "success",
      message: "plant adopted successfully",
      data: {
        adoption,
        plant,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAdoptions = async (req, res, next) => {
  try {
    const adoptions = await Adoption.find()
      .populate("userId")
      .populate("plantId");

    res.status(200).json({
      status: "success",
      message: `${adoptions.length} records`,
      data: {
        adoptions,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.editAdoption = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const { plantId, reason } = req.body;
    const plant = await Plant.findById(plantId);
    const adoption = await Adoption.findByIdAndUpdate(req.params._id, req.body);

    plant.status = "pending";
    plant.save();

    res.status(200).json({
      status: "success",
      data: {
        adoption,
      },
    });
  } catch (err) {
    next(err);
  }
};
