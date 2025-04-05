const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

const app = express();

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("NOT CONNECTED TO NETWORK", err);
    process.exit(1); // Exit the process with an error if DB connection fails
  });

// Routes setup
app.use("/", Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
