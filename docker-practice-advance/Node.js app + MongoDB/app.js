const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Read env variables
const mongoHost = process.env.MONGO_HOST || "mongodb";
const mongoUser = process.env.MONGO_USER || "root";
const mongoPass = process.env.MONGO_PASSWORD || "rootpass";
const mongoDB   = process.env.MONGO_DB || "nodeappdb";

// Connection string
const uri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:27017/${mongoDB}?authSource=admin`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
    res.send("Hello from Node.js + MongoDB in Docker!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
