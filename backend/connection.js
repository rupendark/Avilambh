const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema({}, { strict: false }); // Allow all fields
// const Comment = mongoose.model("Comment", commentSchema, "comments");

// mongoose.connect("mongodb+srv://anurodhk82:gq8CCSzEVrn7jIcO@cluster0.xkly0.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0",
mongoose.connect("mongodb+srv://rupendark301:rzWH3Jsfr1icbeH7@avilambh.sbyrp.mongodb.net/AVILAMBH?retryWrites=true&w=majority&appName=AVILAMBH"
).then(async () => {
    console.log("Connected to MongoDB Atlas");
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    // console.log("Collections:", collections.map(col => col.name)); // Print collection names

    // mongoose.connection.close();
}).catch(err => console.error("Connection error:", err));
