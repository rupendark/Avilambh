const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://rupendark301:rzWH3Jsfr1icbeH7@avilambh.sbyrp.mongodb.net/AVILAMBH?retryWrites=true&w=majority&appName=AVILAMBH"
).then(async () => {
    console.log("Connected to MongoDB Atlas");
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();  

}).catch(err => console.error("Connection error:", err));
