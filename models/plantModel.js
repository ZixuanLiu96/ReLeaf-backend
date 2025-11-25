const mongoose = require("mongoose");
const { Schema } = mongoose;

const plantSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "A plant must have a name."],
  },
  species: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A plant must have a description."],
  },
  age: Number,
  status: {
    type: String,
    enum: ["available", "adopted", "pending"],
    default: "available",
  },
  location: {
    type: String,
    required: [true, "A plant must have a location."],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  adoptedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  careInstruction: String,
  imageUrl: {
    type: Array,
    required: [true, "A plant must have at least a picture!"],
  },
});

const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;
