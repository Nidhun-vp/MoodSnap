const mongoose = require("mongoose");

module.exports = mongoose.model("Mood", {
 userId: String,
 username: String,
 mood: String,
 note: String,
 createdAt: {
   type: Date,
   default: Date.now
 }
});