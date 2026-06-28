// Import Express framework to build web server and routes
const express = require("express");
const router = express.Router({ mergeParams: true }); // router object
// Import wrapper function for handling async route errors automatically
const wrapAsync = require("../utils/wrapAsync.js");
// Import Mongoose model for listings collection
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
// Import custom error class for structured error handling
const ExpressError = require("../utils/ExpressError.js");
const ReviewController = require("../controllers/review.js");
const {
  reviewValidate,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
//reviews
//post route
router.post(
  "/",
  isLoggedIn,
  reviewValidate,
  wrapAsync(ReviewController.createReview),
);

//Delete review route
router.delete(
  "/:reviewId", //when there are two ids for first we use :id and for rest we use its name and id
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(ReviewController.destroyReview),
);

module.exports = router;
