const mongoose = require("mongoose");
const { Schema } = mongoose;

const adoptionSchema = new Schema({
  plantId: {
    type: Schema.Types.ObjectId,
    ref: "Plant",
    required: [true, "An adoption record must have a plant id!"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "An adoption record must have a user id!"],
  },
  adoptedAt: {
    type: Date,
    default: Date.now,
  },
  returnedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "returned"],
    default: "active",
  },
  message: String,
});

const Adoption = mongoose.model("Adoption", adoptionSchema);

module.exports = Adoption;
