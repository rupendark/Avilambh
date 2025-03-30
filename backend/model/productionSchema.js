const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema({
    Production_Id: { type: String, required: true, unique: true }, // Unique Inventory ID
    Mine_Id: { type: String, required: true },
    Date: { type: String, required: true }, 
    Quantity: { type: Number, required: true },
    Quality: { type: String, required: true } 
}, { collection: "production" }); // Explicitly reference the collection name

const Production = mongoose.model("Production", productionSchema,'Production');

module.exports = Production;