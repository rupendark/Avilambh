const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    transport_id: { type: String, required: true, unique: true }, // Unique auto increment
    vehicle_no: { type: String, required: true },
    driver_name: { type: String, required: true },
    transport_date: { type: Date, required: true },
    destination: { type: String, required: true },
    quantity: { type: Number, required: true },
    flag: { type: Boolean, required: true },
  },
  { collection: "Transport" }
); // Explicitly reference the collection name



const Transport = mongoose.model("Transport", transportSchema, "Transport");

module.exports = Transport;
