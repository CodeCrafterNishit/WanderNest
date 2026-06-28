const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");
const axios = require("axios");

module.exports.index = async (req, res) => {
  // Fetch all listings from database
  const allListings = await Listing.find({});

  // Render index page with listings data
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res, next) => {
 const location = `${req.body.listing.location}, ${req.body.listing.country}`;

const response = await axios.get(
  "https://nominatim.openstreetmap.org/search",
  {
    params: {
      q: location,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": "WanderNest Learning Project",
    },
  }
);
  // Create new listing document
  const newListing = new Listing(req.body.listing);

  if (response.data.length > 0) {
  newListing.geometry = {
    type: "Point",
    coordinates: [
      parseFloat(response.data[0].lon),
      parseFloat(response.data[0].lat),
    ],
  };
} else {
  console.log("Coordinates not found");
}

  // Convert image string into object format
  newListing.image = {
    filename: req.file.filename,
    url: req.file.path,
  };

  newListing.owner = req.user._id; //in our passport it automatically stores username using req.user in that it has _id which points to the user
  // Save listing to database
  await newListing.save();

  console.log(newListing.geometry);

  //using flash
  req.flash("success", "New Listing Created!");

  // Redirect to listings page
  res.redirect("/listings");
};

module.exports.renderListingDetails = async (req, res) => {
  let { id } = req.params;

  // Check if ID format is valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid ID");
  }

  // Find listing by ID
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  // If listing does not exist
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  // Render listing details page
  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  // Find listing to edit
  const listing = await Listing.findById(id);

  // If listing not found
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  let originalListingImg = listing.image.url;
  originalListingImg = originalListingImg.replace(
    "/upload",
    "/upload/h_300,w_250",
  );
  // Render edit page with existing data
  res.render("listings/edit.ejs", { listing, originalListingImg });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid ID");
  }

  let listingData = req.body.listing;

  const location = `${listingData.location}, ${listingData.country}`;

const response = await axios.get(
  "https://nominatim.openstreetmap.org/search",
  {
    params: {
      q: location,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": "WanderNest Learning Project",
    },
  }
);

if (response.data.length > 0) {
  listingData.geometry = {
    type: "Point",
    coordinates: [
      parseFloat(response.data[0].lon),
      parseFloat(response.data[0].lat),
    ],
  };
}

  // Convert image string into object structure
  if (typeof req.file !== "undefined") {
    listingData.image = {
      filename: req.file.filename,
      url: req.file.path,
    };
  }

  // Update listing and return updated document
  const updatedListing = await Listing.findByIdAndUpdate(id, listingData, {
    new: true,
  });

  // If listing does not exist
  if (!updatedListing) {
    throw new ExpressError(404, "Listing not found");
  }

  req.flash("success", "Listing Updated!");

  // Redirect to updated listing page
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;

  // Delete listing from database
  const deletedListing = await Listing.findByIdAndDelete(id);

  // If listing does not exist
  if (!deletedListing) {
    throw new ExpressError(404, "Listing not found");
  }

  req.flash("success", "Listing Deleted!");
  // Redirect after deletion
  res.redirect("/listings");

  // Log deleted document in console
  console.log(deletedListing);
};
