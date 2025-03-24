const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    sequence_value: { type: Number }, // Start from 1000
  },
  { collection: "Counter" }
);

const Counter = mongoose.model("Counter", counterSchema, "Counter");

module.exports = Counter;
