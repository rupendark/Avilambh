const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    // transport_id: { type: String, required: true, unique: true }, // Unique auto increment
    vehicle_no: { type: String, required: true },
    driverName: { type: String, required: true },
    date: { type: Date, required: true },
    // destination: { type: String, required: true },
    // quantity: { type: Number, required: true },
    flag: { type: Boolean, required: true },
  },
  { collection: "Drivers" }
); // Explicitly reference the collection name



const Drivers = mongoose.model("Drivers", driverSchema, "Drivers");

module.exports = Drivers;