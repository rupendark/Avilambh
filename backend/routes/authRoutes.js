const express = require("express");
const User = require("../model/userSchema");
const { generateToken } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0
    ) {
      return res.json({ status: 400, message: "The Body has invalid data." });
    }

    let createUser;
    createUser = await User.findOne({ email });
    if (createUser) {
      createUser.password === password
        ? console.log("pass match")
        : res.json({ status: 401, message: "Invalid Password" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      createUser = new User({ email, password: hashedPassword });
      console.log(createUser);
      await createUser.save();
    }

    const userdata = await User.find({ email });

    // const token = generateToken(userdata);
    res.cookie("jwtToken", userdata, {
      httpOnly: false,
      secure: false,
      maxAge: 18000000,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Login successful"});
  } catch (err) {
    console.error("An unexpected error occurred:", err);
  }
});

module.exports = router;
