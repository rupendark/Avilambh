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

//INVENTORY
app.get("/inventory", isGuest, async (req, res) => {
  const items = await Inventory.find();
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
app.delete("/inventory/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Inventory.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});
app.put("/inventory/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Inventory_id,item_name, quantity, reorder_level } = req.body;
    console.log(req.body);
    const updatedItem = await Inventory.findByIdAndUpdate(id, { Inventory_id, item_name, quantity ,reorder_level});
    
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});




//TRANSPORT
app.get("/transport", isGuest, async (req, res) => {
  const items = await Transport.find();
  res.send(items);
});
app.post("/transport/addItem", async (req, res) => {
  try {
    console.log(req.body)
    await Transport.insertOne(req.body);
    res.status(201).send({ message: "New item added" });
    console.log("Item added");
  } catch (error) {
    res.status(500).send({ error: "Error" });
  }
});
app.put("/transport/complete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Transport.findByIdAndUpdate(id, {$set: { flag: true }},{ new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});
app.delete("/transport/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Transport.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});
app.put("/transport/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedItem = await Transport.findByIdAndUpdate(id, data);
    
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});






//REPORTS
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





//START SERVER
app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
