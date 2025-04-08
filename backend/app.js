const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("./connection.js");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const twilio = require("twilio");
require("dotenv").config();
const Inventory = require("./model/inventorySchema");
const Counter = require("./model/counterSchema");
const Transport = require("./model/transportSchema.js");
const SMP = require("./model/smpSchema.js");
const Drills = require("./model/trainingSchema.js");
const Jobs = require("./model/jobSchema.js");
const Production = require("./model/productionSchema.js");


app.use(
  cors({
    origin: "http://localhost:3000", // Adjust based on your frontend URL
    credentials: true, // Allow sending cookies
  })
);
app.use(express.json());
app.use(cookieParser());

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use("/auth", authRoutes);
app.use("/test", userRoutes);

// Function to generate alphanumeric ID (e.g., INV1001, INV1002...)
const getNextId = async (name) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: name }, // Unique ID for counter tracking
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true } // Create if not exists
    );
    return counter.sequence_value;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};


//SEND SMS
app.post("/send-sms", async (req, res) => {
  data = req.body;
  try {
    const response = await client.messages.create({
      body: `task: ${data.task} , start_time:  ${data.start_time}, end_time:  ${data.end_time}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.TEST_PHONE_NUMBER,
    });
    console.log("SMS Sent:", response.sid);
  } catch (error) {
    console.error("Twilio Error:", error);
  }
});

//JOB SCHEDULING
app.get("/jobs", async (req, res) => {
  const items = await Jobs.find();
  res.send(items);
});
app.post("/jobs/addItem", async (req, res) => {
  try {
    const newId = await getNextId("jobId");
    const newItem = {
      job_id: `JB${newId}`,
      smp_id: req.body.smp_id,
      batch: req.body.batch,
      task: req.body.task,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    };
    await Jobs.insertOne(newItem);
    res.status(201).send({ message: "New item added" });
    console.log("Item added");
  } catch (error) {
    res.status(500).send({ error: "Error" });
  }
});
app.delete("/jobs/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Jobs.deleteOne({ job_id: id });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});
app.put("/jobs/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { smp_id, start_time, end_time, batch, task } = req.body;
    const updatedItem = await Jobs.updateOne(
      { job_id: id },
      {
        $set: {
          smp_id: smp_id,
          start_time: start_time,
          end_time: end_time,
          batch: batch,
          task: task,
        },
      }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

//safety
app.get("/safety", async (req, res) => {
  const items = await Drills.find();
  res.send(items);
});
app.post("/safety/addItem", async (req, res) => {
  try {
    const newId = await getNextId("drillId");
    const newItem = {
      drill_id: `DRL${newId}`,
      training_type: req.body.training_type,
      scheduled_date: req.body.scheduled_date,
      incharge: req.body.incharge,
    };
    await Drills.insertOne(newItem);
    res.status(201).send({ message: "New item added" });
  } catch (error) {
    res.status(500).send({ error: "Error" });
  }
});
app.put("/safety/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedItem = await Drills.findByIdAndUpdate(id, data);

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

//INVENTORY
app.get("/inventory", async (req, res) => {
  const items = await Inventory.find();
  res.send(items);
});
app.post("/inventory/addItem", async (req, res) => {
  try {
    const newId = await getNextId("inventoryId");
    const newItem = {
      Inventory_Id: `INV${newId}`,
      item_name: req.body.item_name,
      quantity: req.body.quantity,
      reorder_level: req.body.reorder_level,
    };
    await Inventory.insertOne(newItem);
    res.status(201).send({ message: "New item added" });
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
    const { Inventory_id, item_name, quantity, reorder_level } = req.body;
    console.log(req.body);
    const updatedItem = await Inventory.findByIdAndUpdate(id, {
      Inventory_id,
      item_name,
      quantity,
      reorder_level,
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

//TRANSPORT
app.get("/transport", async (req, res) => {
  const items = await Transport.find();
  res.send(items);
});
app.post("/transport/addItem", async (req, res) => {
  try {
    console.log(req.body);
    const newId = await getNextId("transportId");

    const newItem = {
      transport_id: `TID${newId}`, // Unique auto increment
      vehicle_no: req.body.vehicle_no,
      driver_name: req.body.driver_name,
      transport_date: req.body.transport_date,
      destination: req.body.destination,
      quantity: req.body.quantity,
      flag: "false",
    };

    await Transport.insertOne(newItem);

    res.status(201).send({ message: "New item added" });
  } catch (error) {
    res.status(500).send({ error: "Error" });
  }
});
app.put("/transport/complete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Transport.findByIdAndUpdate(
      id,
      { $set: { flag: true } },
      { new: true }
    );
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
app.get("/reports", async (req, res) => {
  const items = await SMP.find();
  res.send(items);
});
app.post("/reports/addItem", async (req, res) => {
  console.log(req.body);
  const newId = await getNextId("smpId");

  const newItem = {
    report_id: `SMP${newId}`, // Unique auto increment
    mine_id: req.body.mine_id,
    status: req.body.status,
    date: req.body.date,
    findings: req.body.findings,
    inspected_by: req.body.inspected_by,
    recommendations: req.body.recommendations,
  };
  console.log(newItem);
  try {
    await SMP.insertOne(newItem);
    res.status(201).send({ message: "Report saved successfully!" });
    console.log("Report saved successfully!");
  } catch (error) {
    res.status(500).send({ error: "Error saving report" });
  }
});
app.delete("/reports/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SMP.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});
app.put("/reports/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { report_id, mine_id, status, date, inspected_by } = req.body;
    console.log(req.body);
    const updatedItem = await SMP.findByIdAndUpdate(id, {
      report_id,
      mine_id,
      status,
      date,
      inspected_by,
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});
app.put("/reports/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await SMP.findByIdAndUpdate(
      id,
      { $set: { status: true } },
      { new: true }
    );
    res.json(updatedItem);
    console.log("updated");
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});

// Production
app.get("/production", async (req, res) => {
  const items = await Production.find();
  res.send(items);
});
app.delete("/production/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Production.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});
app.put("/production/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedItem = await Production.findByIdAndUpdate(id, data);

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item" });
  }
});
app.post("/production/addItem", async (req, res) => {
  console.log(req.body);
  const newId = await getNextId("productionId");
  const newItem = {
    Production_Id: `PRO${newId}`, // Unique auto increment
    Mine_Id: req.body.mine_id,
    Date: req.body.date,
    Quantity: req.body.quantity,
    Quality: req.body.quality
  };
  console.log(newItem);
  try {
    await Production.insertOne(newItem);
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
