const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    report_id: { type: String, required: true,unique: true }, // Unique
    mine_id: { type: String, required: true },
    status: { type: String, required: true }, 
    findings: { type: String, required: true },
    date: { type: Date, required: true }, 
    inspected_by: { type: String, required: true },
    recommendations: { type: String, required: true }
}, { collection: "SMP" }); // Explicitly reference the collection name

const SMP = mongoose.model("SMP", reportSchema,'SMP');

module.exports = SMP;