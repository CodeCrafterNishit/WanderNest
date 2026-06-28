const express = require("express");
const Listing = require("../models/listing.js");
// Import wrapper function for handling async route errors automatically
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose");
const { isLoggedIn, isOwner, listingValidate } = require("../middleware.js");
const router = express.Router(); // router object
const ListingController = require("../controllers/listing.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(ListingController.index)) // INDEX ROUTE--->Show all listings
  // CREATE ROUTE---->Save new listing into database
  .post(
    isLoggedIn,
    // First validate incoming data
    upload.single("listing[image]"),
    listingValidate,
    wrapAsync(ListingController.showListings),
  );

// NEW ROUTE
// Show form to create new listing
router.get("/new", isLoggedIn, ListingController.renderNewForm);

router
  .route("/:id") // SHOW ROUTE
  // Show single listing details
  .get(wrapAsync(ListingController.renderListingDetails))

  // UPDATE ROUTE
  // Update existing listing data
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    // Validate updated data first
    listingValidate,
    wrapAsync(ListingController.updateListing),
  )

  // DELETE ROUTE
  // Delete listing by ID
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));

// EDIT ROUTE
// Show edit form for existing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm),
);

module.exports = router;
