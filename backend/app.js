const express = require('express');
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')
require('./connection.js')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const Inventory = require('./model/inventorySchema')
const {isGuest} = require("./middleware/auth");
const Transport = require('./model/transportSchema.js');


app.use(cors({
    origin: "http://localhost:3000",  // Adjust based on your frontend URL
    credentials: true,  // Allow sending cookies
  }));
app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRoutes);
app.use('/test', userRoutes);


app.get('/', (req, res) => {
    console.log("hello")
    res.send("HELLo");

})

app.get('/inventory', isGuest,async (req, res) => {
    const items = await Inventory.find();
    console.log(items);
    res.send(items)
})

app.get('/transport', isGuest,async (req, res) => {
    const items = await Transport.find();
    console.log(items);
    res.send(items)
})

app.listen(5000, () => {
    console.log(`http://localhost:5000`);
})