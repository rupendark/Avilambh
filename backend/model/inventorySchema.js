const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    Inventory_Id: { type: String, required: true, unique: true }, // Unique Inventory ID
    item_name: { type: String, required: true }, // Name of the item
    quantity: { type: Number, required: true }, // Quantity as a number
    reorder_level: { type: Number, required: true } // Reorder level as a number
}, { collection: "inventory" }); // Explicitly reference the collection name

const Inventory = mongoose.model("Inventory", inventorySchema,'Inventory');

module.exports = Inventory;
