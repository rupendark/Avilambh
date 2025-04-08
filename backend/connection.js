const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.Mongo_Conn_String
).then(async () => {
    console.log("Connected to MongoDB Atlas");
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();  

}).catch(err => console.error("Connection error:", err));
