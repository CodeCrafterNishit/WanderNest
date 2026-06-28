// Import Mongoose library for MongoDB schema and models
const mongoose = require("mongoose");
const Review = require("./review.js");
// Create shortcut reference for Schema constructor
const Schema = mongoose.Schema;

// Define schema structure for listings collection
const ListingSchema = new Schema({
  // Listing title field
  title: {
    type: String, // Must be string
    required: true, // Title is mandatory
  },

  // Listing description field
  description: {
    type: String, // Text description of property
  },

  // Nested image object
  image: {
    // Store image filename
    filename: {
      type: String,
    },

    // Store image URL
    url: {
      type: String,
    },
  },

  // Listing price field
  price: {
    type: Number, // Numeric value
  },

  // Location / city field
  location: {
    type: String,
  },

  // Country field
  country: {
    type: String,
  },

  geometry: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
},

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner:{
    type: Schema.Types.ObjectId,
      ref: "User",
  },
});

ListingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Create model from schema
// "Listing" becomes collection name "listings" in MongoDB
const Listing = mongoose.model("Listing", ListingSchema);

// Export model for use in other files
module.exports = Listing;
