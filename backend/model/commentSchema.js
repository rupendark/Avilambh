const mongoose = require("mongoose");

const commentschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    movie_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to movie
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { collection: "reviews" }); // Ensure this matches your actual collection name

const Comments = mongoose.model("Comments", commentschema,'comments');

module.exports = Comments;
