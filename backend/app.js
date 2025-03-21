const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("./connection.js");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const Inventory = require("./model/inventorySchema");
const { isGuest } = require("./middleware/auth");
const Transport = require("./model/transportSchema.js");
const SMP = require("./model/smpSchema.js");

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust based on your frontend URL
    credentials: true, // Allow sending cookies
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/test", userRoutes);

app.get("/", (req, res) => {
  res.send("HELLo");
});

app.get("/inventory", isGuest, async (req, res) => {
  const items = await Inventory.find();
  console.log(items);
  res.send(items);
});
app.post("/inventory/addItem", async (req, res) => {
  try {
    await Inventory.insertOne(req.body);
    res.status(201).send({ message: "New item added" });
    console.log("Item added");
  } catch (error) {
    res.status(500).send({ error: "Error" });
  }
});

app.get("/transport", isGuest, async (req, res) => {
  const items = await Transport.find();
  console.log(items);
  res.send(items);
});

app.get("/reports", isGuest, async (req, res) => {
  const items = await SMP.find();
  res.send(items);
});

app.post("/reports/addItem", async (req, res) => {
  try {
    await SMP.insertOne(req.body);
    res.status(201).send({ message: "Report saved successfully!" });
    console.log("Report saved successfully!");
  } catch (error) {
    res.status(500).send({ error: "Error saving report" });
  }
});

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
