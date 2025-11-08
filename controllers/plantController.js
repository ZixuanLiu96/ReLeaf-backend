const Plant = require("../models/plantModel");

exports.getAllPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find(req.query);
    // console.log(req.query);

    res.status(200).json({
      status: "success",
      message: `${plants.length} records`,
      data: {
        plants,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createPlant = async (req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        plant: newPlant,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPlant = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant) {
      throw new Error("No plant found with this ID");
    }
    res.status(200).json({
      status: "success",
      data: {
        plant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updatePlant = async (req, res, next) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.plantId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plant) {
      throw new Error("No plant found with this ID");
    }
    res.status(200).json({
      status: "success",
      data: {
        plant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deletePlant = async (req, res, next) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.plantId);
    if (!plant) {
      throw new Error("No plant found with this ID");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
