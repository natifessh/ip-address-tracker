require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend access

const API_KEY = process.env.API_KEY;

app.get("/get-api-key", (req, res) => {
  res.json({ apiKey: API_KEY });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
