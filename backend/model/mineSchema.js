const mongoose = require("mongoose");

const mineSchema = new mongoose.Schema({
    Mine_Id: { type: String, required: true,unique: true },
    Location: { type: String, required: true },
    Capacity: { type: Number, required: true },
    Saftey_status: { type: String, required: true } 
}, { collection: "Mine" }); // Explicitly reference the collection name

const Mine = mongoose.model("Mine", mineSchema,'Mine');

module.exports = Mine;