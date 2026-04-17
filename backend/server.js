const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

import cors from "cors";


app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/moods", require("./routes/moods"));

app.listen(5000, ()=>console.log("Server running on 5000"));
