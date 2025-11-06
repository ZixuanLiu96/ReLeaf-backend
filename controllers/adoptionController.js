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

    if (plant.status !== "available")
      return next(new AppError("This plant is unavailable!", 400));

    const adoption = await Adoption.create({
      plantId,
      userId,
      message,
      adoptedAt: Date.now(),
      status: "active",
    });

    plant.status = "adopted";
    plant.adoptedBy = userId;
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
