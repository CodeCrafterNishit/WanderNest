// Import Mongoose library for MongoDB schema and models
const mongoose = require("mongoose");

// Create shortcut reference for Schema constructor
const Schema = mongoose.Schema;

//Creating review Schema
const reviewSchema = new Schema({
  comment: {
    type:String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});

module.exports = mongoose.model("Review",reviewSchema);