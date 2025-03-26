const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    drill_id: { type: String, required: true, unique: true }, // Unique
    mine_id: { type: String, required: true },
    training_type: { type: String, required: true },
    scheduled_date: { type: Date, required: true },
    issue_detected: { type: String, required: true },
    potential_danger: { type: String, required: true },
    incharge: { type: String, required: true },
  },
  { collection: "Drills" }
); // Explicitly reference the collection name

const Drills = mongoose.model("Drills", trainingSchema, "Drills");

module.exports = Drills;
