const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        required: [true, "Role is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    }

});

module.exports= mongoose.model('UserProfile',userSchema,'userprofile');